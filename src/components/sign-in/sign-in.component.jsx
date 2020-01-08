import React from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";
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

        const { email, password } = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({email: '', password: ''})
        } catch (e) {
            console.error(e);
        }

        this.setState({email: '', password: ''});
    };

    handleChange = (event) => {
        const { value, name } = event.target;

        this.setState({[name]: value});
    };

    render() {
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
                            <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign in with Google</CustomButton>
                        </ButtonsContainer>
                </form>
            </SigninContainer>
        )
    }
}

export default SignIn;