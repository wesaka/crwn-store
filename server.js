const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Express makes it simple to create a backend node server
const app = express();

// This is important so when deploying to heroku, it knows what to do in that environment
// Also, the port 5000 is set in the client/package.json with "proxy": "http://localhost:5000"
const port = process.env.PORT || 5000;

// This is a quick way to use directly the body of incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cors is a very cool library that verifies if the request comes from the same source as the server is hosted
// Which is exactly what we want, it is an extra safety feature that allows us to properly make requests to the backend server
app.use(cors());

// If we are in production, we want to make sure that express knows where the build script is
// and we want to serve the static files that are in there
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    // app.get is how we tell to express how we are going to handle get requests
    // In react, all of our front end client code is contained in index.html
    app.get('*', function (request, response) {
        response.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    })
}

app.listen(port, error => {
    if (error) throw (error);
    console.log('Server running on port ' + port);
});
// And that's the basic express -- node server setup

// Here, we are setting up the listener for the post request that the pay button is going to make
// Here we receive all the info regarding the payment via post in the body of the request
app.post('/payment', (request, response) => {
    const body = {
        source: request.body.token.id,
        amount: request.body.amount,
        currency: 'usd'
    };

    stripe.charges.create(body, (stripeError, stripeResponse) => {
        if (stripeError) {
            response.status(500).send({ error: stripeError });
        } else {
            response.status(200).send({ success: stripeResponse });
        }
    })
});