import React from "react";
import { connect } from 'react-redux';

import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";

import {SigninContainer, TitleContainer} from "../sign-in/sign-in.styles";
import { signUpStart } from "../../redux/user/user.actions"; // I'll be reusing the styles from signin as they are identical

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const { signUpStart } = this.props;
        const { displayName, email, password, confirmPassword } = this.state;

        signUpStart(displayName, email, password, confirmPassword);
    };

    handleChange = event => {
        const {name, value} = event.target;

        this.setState({[name]: value});
    };

    render() {
        const {displayName, email, password, confirmPassword} = this.state;

        return (
            <SigninContainer>
                <TitleContainer>I do not have an account</TitleContainer>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput
                        type='text'
                        name='displayName'
                        value={displayName}
                        onChange={this.handleChange}
                        label='Display Name'
                        required
                    />
                    <FormInput
                        type='email'
                        name='email'
                        value={email}
                        onChange={this.handleChange}
                        label='Email'
                        required
                    />
                    <FormInput
                        type='password'
                        name='password'
                        value={password}
                        onChange={this.handleChange}
                        label='Password'
                        required
                    />
                    <FormInput
                        type='password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={this.handleChange}
                        label='Confirm Password'
                        required
                    />
                    <CustomButton type='submit'>SIGN UP</CustomButton>
                </form>
            </SigninContainer>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    signUpStart: (displayName, email, password, confirmPassword) => dispatch(
        signUpStart({displayName, email, password, confirmPassword})
    )
});

export default connect(null, mapDispatchToProps)(SignUp);