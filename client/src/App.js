import React, { useEffect } from 'react';
import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom'

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignPage from "./pages/sign/sign.component";
import CheckoutPage from "./pages/checkout/checkout.component";

import {connect} from 'react-redux'

import { selectCurrentUser } from "./redux/user/user.selectors";
import { checkUserSession } from "./redux/user/user.actions";

import {createStructuredSelector} from "reselect";


const App = ({ checkUserSession, currentUser }) => {
    // Also, useEffect can mimic componentWillUnmount by calling a cleanup function
    // Such thing would be achieved like this (example of subscription)
    // useEffect(() => {
    //     console.log("I am subscribing");
    //     const unsubscribeFromCollections = firestore
    //         .collection('collections')
    //         .onSnapshot(snapshot => console.log(snapshot));
    //
    // This following is the cleanup function
    //     return () => {
    //         console.log('I am unsubscribing');
    //         unsubscribeFromCollections();
    //     };
    //     }, []
    // );

    useEffect(() => {
        checkUserSession()
    }, [checkUserSession]);

    return (
        <div>
            <Header/>
            <Switch>
                <Route exact path='/' component={HomePage}/>
                <Route path='/shop' component={ShopPage}/>
                <Route exact path='/checkout' component={CheckoutPage}/>
                <Route exact path='/sign'
                       render={() => currentUser ? (<Redirect to='/'/>) : (<SignPage/>)}/>
            </Switch>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
