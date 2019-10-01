import React from 'react';
import { Grid, Form, Segment, Button, Header, Message, Icon } from "semantic-ui-react";
import firebase from "../../firebase";
import { Link } from "react-router-dom";
import md5 from "md5";

class Register extends React.Component{
    state = {
        username: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        errors: [],
        loading: false,
        usersRef: firebase.database().ref("users")
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        if (!this.isFormValid()) return;
        event.preventDefault();
        this.setState({ loading: true, errors: [] })
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(createdUser => {
                console.log(createdUser);
                createdUser.user.updateProfile({
                    displayName: this.state.username,
                    photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
                })
                .then(() => {
                    this.saveUser(createdUser).then(() => {
                        this.setState({ loading: false });
                        console.log("user.saved");
                    })
                })
                .catch(err => {
                    this.setState({ errors: this.state.erros.concat(err), loading: false });
                })
            })
            .catch(err => {
                console.error(err);
                this.setState({ errors: this.state.errors.concat(err), loading: false })
            })
    }

    saveUser = (createdUser) => {
        return this.state.usersRef.child(createdUser.user.uid).set({
            name: createdUser.user.displayName,
            avatar: createdUser.user.photoURL
        });
    }

    isFormValid = () => {
        let errors = [];
        let error = "";

        if (this.isFormEmpty(this.state)){
            // throw error
            error = { message: 'Fill in all fields' };
            this.setState({ errors: errors.concat(error) });
            return false;
        }
        else if (!this.isPasswordValid(this.state)){
            // throw error
            error = { message: "Password is invalid" };
            this.setState({ errors: errors.concat(error) });
            return false;
        }
        else{
            // form valid
            return true;
        }
    }

    isPasswordValid = ({ password, passwordConfirmation }) => {
        if (password.length < 6 || passwordConfirmation.length < 6){
            return false;
        }
        else if (password !== passwordConfirmation){
            return false;
        }
        else{
            return true;
        }  
    }

    isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
        return !username.length || !email.length || !password.length || !passwordConfirmation;
    }

    handleInputErrors = (errors, inputName) => {
        return errors.some((error) => error.message.toLowerCase().includes(inputName)) ? 'error' : '';
    }

    displayErrors = (errors) => {
        return errors.map((error, i) => <p key={i}>{ error.message }</p>)
    }

    render(){
        const { username, email, password, passwordConfirmation, errors, loading } = this.state;
        return(
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" icon color="orange" textAlign="center">
                        <Icon name="puzzle piece" color="orange" />
                        Register for DevChat
                    </Header>
                    <Form size="large" onSubmit={this.handleSubmit}>
                        <Segment>
                            <Form.Input fluid name="username" icon="user" iconPosition="left"
                                placeholder="UserName" onChange={this.handleChange} type="text" value={username}
                            />
                            <Form.Input fluid name="email" icon="mail" iconPosition="left"
                                placeholder="Email Address" onChange={this.handleChange} type="email" value={email}
                                className={this.handleInputErrors(errors, 'email')}
                            />
                            <Form.Input fluid name="password" icon="lock" iconPosition="left"
                                placeholder="Password" onChange={this.handleChange} type="password" value={password}
                                className={this.handleInputErrors(errors, 'password')}
                            />
                            <Form.Input fluid name="passwordConfirmation" icon="repeat" iconPosition="left"
                                placeholder="Password Confirmation" onChange={this.handleChange} type="password" value={passwordConfirmation}
                                className={this.handleInputErrors(errors, 'password')}
                            />
                            <Button disabled={loading} className={loading ? 'loading' : ''} color="orange" fluid size="large">Submit</Button>
                        </Segment>
                    </Form>
                    {errors.length && (
                        <Message error>
                            <h3>Error</h3>
                            {this.displayErrors(errors)}
                        </Message>
                    )}
                    <Message>Already a user ? <Link to="/login">Login</Link></Message>
                </Grid.Column>
            </Grid>
            // <div>Register</div>
        )
    }
}

export default Register;