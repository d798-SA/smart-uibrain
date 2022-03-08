import React from 'react';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import './styleSingIn.css';





export default class SingIn extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
            errorsState: {
                InputName: 'name is required',
                InputEmail: 'email is required',
                InputPassword: 'password is required'
            }
        };
    };



    handleOnBlurEmail(event) {
        let email = event.target.value.trim();

        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (email.length <= 0) {
            return this.setState(prevstate => ({
                errorsState: Object.assign(prevstate.errorsState, {

                    InputEmail: 'email is required'

                })
            }));


        } else {
            if (!re.test(email)) {
                return this.setState(prevstate => ({
                    errorsState: Object.assign(prevstate.errorsState, {

                        InputEmail: 'email is invalid'

                    })
                }));


            }
            else {
                return delete this.state.errorsState?.InputEmail

            }
        }



    }


    handleOnBlurPassword(event) {
        let password = event.target.value;

        if (password.length < 8) {
            return this.setState(prevstate => ({
                errorsState: Object.assign(prevstate.errorsState, {
                    InputPassword: 'password is required'
                })
            }));


        } else {
            return delete this.state.errorsState?.InputPassword


        }


    }


    onSingInEmailChange = (event) => {

        this.setState({ signInEmail: event.target.value });
        ;

    };

    onSignInPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value });
    }

    onSubmitSignIn = (event) => {




        fetch('https://brin-api-side.herokuapp.com/singIn', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.id) {
                    this.props.loadUser(data)
                    this.props.onRouteChange('home');
                } else {
                    console.log(data);
                }
            })
            .catch(error => {
                console.log('something went wrong');
            })


    }

    render() {
        const { onRouteChange } = this.props;
        return (


            <form action="">
                <div className={'from'}>

                    <TextField
                        onChange={event => this.onSingInEmailChange(event)}
                        label="Your Email"
                        type="email"
                        onBlur={this.handleOnBlurEmail.bind(this)}
                        error={typeof this.state.errorsState?.InputEmail != "undefined"}
                        id="email"

                        fullWidth
                        InputProps={{
                            startAdornment: <InputAdornment position="start">{this.state.errorsState?.InputEmail || 'Email'}</InputAdornment>,
                        }}
                    />


                    <TextField
                        onChange={event => this.onSignInPasswordChange(event)}
                        label="Your password"
                        id="password"
                        type="password"
                        onBlur={this.handleOnBlurPassword.bind(this)}
                        error={typeof this.state.errorsState?.InputPassword != "undefined"}
                        fullWidth
                        InputProps={{
                            startAdornment: <InputAdornment position="start">{this.state.errorsState?.InputPassword || 'Password'}</InputAdornment>,
                        }}
                    />


                    <Button

                        onClick={this.onSubmitSignIn}
                        startIcon={<FingerprintIcon />}
                        elevation={3}
                        variant="contained"
                    >Log IN</Button>




                </div>
            </form>
        )
    }
}
