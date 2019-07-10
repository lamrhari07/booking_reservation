
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component, state, ...rest }) => {
  return (
    <Route
      {...rest} render={props => (
        localStorage.getItem('token') ? (
          React.createElement(component, state)
        ) : (
            <Redirect
              to={{
                pathname: '/signin',
                state: { from: props.location },
              }}
            />
          )
      )}
    />
  );
};

export const PublicRoute = ({ component, ...rest }) => {
  return (
    <Route
      {...rest} render={props => (
        localStorage.getItem('token') ? (
          <Redirect
            to={{
              pathname: '/',
            }}
          />
        ) : (
            React.createElement(component, props)
          )
      )}
    />
  );
};