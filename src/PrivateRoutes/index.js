import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import useLocalStorage from "../LocalStorageHook";

const PrivateRoute = ({ component:Component, ...rest }) => {
    const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn', false);
    console.log(isLoggedIn);
    return (
        <Route
            {...rest}
            render={props => (
                isLoggedIn ? (
                    <Component  {...props}/>
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: props.location }
                        }}
                    />
                )
            )
            }
        />
    );
}


export default PrivateRoute
