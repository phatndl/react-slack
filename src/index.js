import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import firebase from "./firebase";
import 'semantic-ui-css/semantic.min.css';

import { createStore, applyMiddleware } from "redux";
import { Provider, connect } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import { setUser, clearUser } from "./actions";
import Spinner from "./Spinner";

const store = createStore(rootReducer, composeWithDevTools());

class Root extends React.Component{
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
            console.log(user);
            if (user){
                this.props.userAuth(user);
                this.props.history.push("/");
            }
            else{
                this.props.clearAuth();
                this.props.history.push("/login");
            }
        })
    }
    render(){
        const { isLoading } = this.props;
        return this.props.isLoading ? <Spinner /> : (
            <Switch>
                <Route path="/" exact={true} component={App} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
            </Switch>
        )
        
    }   
}

// const userAuth = (user) => {
//     return async (dispatch) => {
//         dispatch({ type: "SET_USER", payload: {
//             currentUser: user
//         } })
//     }
// }

const mapStateToProps = (state) => {
    return {
        isLoading: state.user.isLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userAuth: (user) => {
            dispatch(setUser(user))
        },
        clearAuth: () => {
            dispatch(clearUser())
        }
    }
    // userAuth
}

// const mapDispatchToProps = () => {
//     userAuth
// }
    
const RootAuthenticated = withRouter(connect(mapStateToProps, mapDispatchToProps )(Root));

ReactDOM.render(<Provider store={ store }><Router><RootAuthenticated /></Router></Provider>, document.getElementById('root'));
registerServiceWorker();
