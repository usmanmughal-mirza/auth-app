import {Redirect,Route} from 'react-router-dom';
import React from 'react';

const PrivateRoute = ({component:Component,...rest}) => {
    return (
        <div>
<Route 
{...rest}
render={(props) =>
    localStorage.getItem("authToken")?(
    <Component {...props} />):(
    <Redirect to="/login" />
    ) 
}




/>


        </div>
    )
}

export default PrivateRoute
