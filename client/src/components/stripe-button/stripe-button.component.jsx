import React from "react";
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = "pk_test_35XwQORwKAuzX8tnBNJjcGXp00Ml3I5hCu";

    const onToken = token => {
        // Axios makes it very easy to make a post request
        // It automatically understands that by passing url equals to 'payment' that we are trying to access our own server
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then(response => {
            // If status equal to 200
            alert('Payment successful')
        }).catch(error => {
            // If status equals to 500
            console.log('Payment error: ', JSON.parse(error));
            alert('There was an issue with your payment. Please make sure you use the provided test credit card.');
        })
    };

    return (
        <StripeCheckout
            label='Pay Now'
            name='CRWN Store'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
};

export default StripeCheckoutButton;