import React from 'react';
import { Grid, Form, Segment, Button, Header, Message, Icon } from "semantic-ui-react";
import firebase from "../../firebase";
import { Link } from "react-router-dom";

class Login extends React.Component{
    state = {
        email: "",
        password: "",
        errors: [],
        loading: false,
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        if (!this.isFormValid(this.state)) return;
        event.preventDefault();
        this.setState({ loading: true, errors: [] })
        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(signedUser => {
                console.log(signedUser);
            })
            .catch(err => {
                this.setState({loading: false, errors: this.state.errors.concat(err)});
            })
        
    }

    isFormValid = ({ email, password }) => email.length && password.length;

    handleInputErrors = (errors, inputName) => {
        return errors.some((error) => error.message.toLowerCase().includes(inputName)) ? 'error' : '';
    }

    displayErrors = (errors) => {
        return errors.map((error, i) => <p key={i}>{ error.message }</p>)
    }

    render(){
        const { email, password, errors, loading } = this.state;
        return(
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h1" icon color="violet" textAlign="center">
                        <Icon name="cod branch" color="violet" />
                        Login for DevChat
                    </Header>
                    <Form size="large" onSubmit={this.handleSubmit}>
                        <Segment>
                            <Form.Input fluid name="email" icon="mail" iconPosition="left"
                                placeholder="Email Address" onChange={this.handleChange} type="email" value={email}
                                className={this.handleInputErrors(errors, 'email')}
                            />
                            <Form.Input fluid name="password" icon="lock" iconPosition="left"
                                placeholder="Password" onChange={this.handleChange} type="password" value={password}
                                className={this.handleInputErrors(errors, 'password')}
                            />

                            <Button disabled={loading} className={loading ? 'loading' : ''} color="violet" fluid size="large">Submit</Button>
                        </Segment>
                    </Form>
                    {errors.length && (
                        <Message error>
                            <h3>Error</h3>
                            {this.displayErrors(errors)}
                        </Message>
                    )}
                    <Message>Don't have an account ? <Link to="/register">Register</Link></Message>
                </Grid.Column>
            </Grid>
            // <div>Login</div>
        )
    }
}

export default Login;