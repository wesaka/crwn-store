import React from "react";
import { connect } from 'react-redux';

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { googleSignInStart, emailSignInStart } from "../../redux/user/user.actions";

import {ButtonsContainer, SigninContainer, TitleContainer} from "./sign-in.styles";

class SignIn extends React.Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const { emailSignInStart } = this.props;
        const { email, password } = this.state;

        emailSignInStart(email, password);
    };

    handleChange = (event) => {
        const {value, name} = event.target;

        this.setState({[name]: value});
    };

    render() {
        const { googleSignInStart } = this.props;

        return (
            <SigninContainer>
                <TitleContainer>I already have an account</TitleContainer>
                <span>Sign in with your password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        name='email'
                        label='Email'
                        value={this.state.email}
                        handleChange={this.handleChange}
                        required/>
                    <FormInput
                        type="password"
                        name='password'
                        label='Password'
                        value={this.state.password}
                        handleChange={this.handleChange}
                        required/>

                    <ButtonsContainer>
                        <CustomButton type="submit"> Sign In </CustomButton>
                        <CustomButton type="button"
                                      onClick={googleSignInStart}
                                      isGoogleSignIn>
                            Sign in with Google
                        </CustomButton>
                    </ButtonsContainer>
                </form>
            </SigninContainer>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
});

export default connect(null, mapDispatchToProps)(SignIn);