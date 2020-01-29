import React, {useState} from "react";
import { connect } from 'react-redux';

import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";

import {SigninContainer, TitleContainer} from "../sign-in/sign-in.styles";
import { signUpStart } from "../../redux/user/user.actions"; // I'll be reusing the styles from signin as they are identical

const SignUp = ({ signUpStart }) => {
    const [ userCredentials, setUserCredentials ] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { displayName, email, password, confirmPassword } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();

        signUpStart(displayName, email, password, confirmPassword);
    };

    const handleChange = event => {
        const {name, value} = event.target;

        setUserCredentials({...userCredentials, [name]: value});
    };

    return (
        <SigninContainer>
            <TitleContainer>I do not have an account</TitleContainer>
            <span>Sign up with your email and password</span>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <FormInput
                    type='text'
                    name='displayName'
                    value={displayName}
                    onChange={handleChange}
                    label='Display Name'
                    required
                />
                <FormInput
                    type='email'
                    name='email'
                    value={email}
                    onChange={handleChange}
                    label='Email'
                    required
                />
                <FormInput
                    type='password'
                    name='password'
                    value={password}
                    onChange={handleChange}
                    label='Password'
                    required
                />
                <FormInput
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={handleChange}
                    label='Confirm Password'
                    required
                />
                <CustomButton type='submit'>SIGN UP</CustomButton>
            </form>
        </SigninContainer>
    )

};

const mapDispatchToProps = dispatch => ({
    signUpStart: (displayName, email, password, confirmPassword) => dispatch(
        signUpStart({displayName, email, password, confirmPassword})
    )
});

export default connect(null, mapDispatchToProps)(SignUp);