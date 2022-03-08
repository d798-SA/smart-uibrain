import React from 'react'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';

import './Register.css';





export default class Register extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            registrationName: '',
            registrationEmail: '',
            registrationPassword: '',
            errorsState: {
                InputName: 'name is required',
                InputEmail: 'email is required',
                InputPassword: 'password is should be greater then 8 character'
            }
        }
    }

    handleOnBlurName(event) {
        let name = event.target.value.trim();

        if (name.length <= 0) {
            return this.setState(prevstate => ({
                errorsState: Object.assign(prevstate.errorsState, {
                    InputName: 'name is required'
                })
            }));


        } else {
            return delete this.state.errorsState?.InputName


        }


    }


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

        if (password.length <= 8) {
            return this.setState(prevstate => ({
                errorsState: Object.assign(prevstate.errorsState, {
                    InputPassword: 'password is should be greater then 8 character'
                })
            }));


        } else {
            return delete this.state.errorsState?.InputPassword


        }


    }





    onNameChange = (event) => {



        this.setState({ registrationName: event.target.value })
    };

    onEmailChange = (event) => {

        this.setState({ registrationEmail: event.target.value })
    }

    onPasswordChange = (event) => {

        this.setState({ registrationPassword: event.target.value })
    }

    onSubmit = (event) => {

        if (Object.keys(this.state.errorsState).length === 0) {
            fetch('https://brin-api-side.herokuapp.com/register', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: this.state.registrationName,
                    email: this.state.registrationEmail,
                    password: this.state.registrationPassword
                })
            })
                .then(res => res.json())
                .then(user => {

                    if (user.id) {
                        this.props.loadUser(user);
                        this.props.onRouteChange('home')
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            alert('Error sending')
        }




    }

    // onRouteChange
    render() {
        const { onRouteChange } = this.props;
        return (

            <div className={'form'}>
                <TextField

                    onChange={event => this.onNameChange(event)}
                    onBlur={this.handleOnBlurName.bind(this)}
                    error={typeof this.state.errorsState?.InputName != "undefined"}
                    label="Your name"
                    id="name"
                    fullWidth
                    InputProps={{
                        startAdornment: <InputAdornment position="start">{this.state.errorsState?.InputName || 'Name'}</InputAdornment>,
                    }}
                />

                <TextField

                    onChange={event => this.onEmailChange(event)}
                    label="Your Email"
                    onBlur={this.handleOnBlurEmail.bind(this)}
                    error={typeof this.state.errorsState?.InputEmail != "undefined"}
                    id="email"
                    fullWidth
                    InputProps={{
                        startAdornment: <InputAdornment position="start">{this.state.errorsState?.InputEmail || 'Email'}</InputAdornment>,
                    }}
                />

                <TextField
                    onChange={event => this.onPasswordChange(event)}
                    label="Your password"
                    onBlur={this.handleOnBlurPassword.bind(this)}
                    error={typeof this.state.errorsState?.InputPassword != "undefined"}
                    id="password"
                    type="password"
                    fullWidth
                    InputProps={{
                        startAdornment: <InputAdornment position="start">{this.state.errorsState?.InputPassword || 'Password'}</InputAdornment>,
                    }}
                />


                <Button

                    onClick={this.onSubmit}
                    variant="contained"
                    startIcon={<SelfImprovementIcon />} >
                    Register
                </Button>

                <br />

            </div>

        )
    }
}