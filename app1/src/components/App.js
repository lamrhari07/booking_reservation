import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.css'
import themes, { overrides } from '../themes';
import Error from '../pages/error';
import LoginView from '../pages/login/LoginView';
import history from '../utils/history';
import LayoutView from './Layout/LayoutView';
import { PublicRoute, PrivateRoute } from '../utils/RequireAuth';

const theme = createMuiTheme({...themes.default, ...overrides});


const App = () => (
  <MuiThemeProvider theme={theme}>
    <Router history={history}>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
        <Route exact path="/app" render={() => <Redirect to="/app/dashboard" />} />
        <PrivateRoute path="/app" component={LayoutView} />
        <PublicRoute path="/login" component={LoginView} />
        <Route component={Error} />
      </Switch>
    </Router>
  </MuiThemeProvider>
);

export default App;