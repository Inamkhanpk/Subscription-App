import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom';
const ProtectedRoute = ({ children,  ...rest }) => {

    const { isAuthenticated } = useSelector(state => state.auth)
    return (
      <Route
       
        {...rest}
        render={({location}) => {
          return isAuthenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: {from: location},
              }}
            />
          );
        }}
      />
    );
  };


  

  export default ProtectedRoute