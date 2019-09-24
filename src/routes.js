import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Header from './pages/Header';
import Error from './pages/Error';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Post from './pages/Post';
import EditPost from './pages/EditPost';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import CheckEmail from './pages/CheckEmail';
import ResetPassoword from './pages/ResetPassoword';

const  Routes = () => {
    return (
        <BrowserRouter>
        <Header/>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/logout" component={Logout}/>
                <Route exact path="/post" component={Post}/>
                <Route exact path="/editpost/:title/:image_name/:postId" component={EditPost}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/forgotpassword" component={ForgotPassword}/>
                <Route exact path="/checkemail" component={CheckEmail}/>
                
                <Route exact path="/resetpassword/:resetPasswordToken" component={ResetPassoword}/>
                <Route  path="*" component={Error}/>
            </Switch>
        </BrowserRouter>
    );  
}

export default Routes;