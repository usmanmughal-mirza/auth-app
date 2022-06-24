
import React, { useEffect, useState } from 'react';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Switch,Route} from 'react-router-dom'

// screens 
import PrivateScreen from './components/screens/PrivateScreen'
import  LoginScreen from './components/screens/LoginScreen';
import  RegisterScreen from './components/screens/RegisterScreen';
import  ForgotPasswordScreen from './components/screens/ForgotPasswordScreen';
import  ResetPasswordScreen from
 './components/screens/ResetPasswordScreen';
//  routing 
import PrivateRoute from './components/routing/PrivateRoute';


const App = () =>{
  return(
    <>

{/* <h1>Auth</h1> */}
<Switch>
<PrivateRoute exact path="/" component={PrivateScreen} />
  <Route exact path="/login" component={LoginScreen}/>
  <Route exact path="/register" component={RegisterScreen}/>
  <Route exact path="/forgotpassword" component={ForgotPasswordScreen}/>
  <Route exact path="/resetpassword/:resetToken"
   component={ResetPasswordScreen}/>
</Switch>  

    </>
  )
}
export default App;