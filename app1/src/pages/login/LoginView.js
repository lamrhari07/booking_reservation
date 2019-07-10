import React from 'react';

import { connect } from 'react-redux';
import {
  Grid,
  CircularProgress,
  Typography,
  withStyles,
  Button,
  Tabs,
  Tab,
  TextField
} from '@material-ui/core';
import logo from './logo.svg';
import { loginUser, UserRegistration } from '../../actions/authAction';


const LoginView = ({ classes, ...props }) => {

  const [inputs, setInputs] = React.useState({});
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }
  const handleInputChange = (event) => {
    event.persist();
    setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
  }

  console.log(props.error.response && props.error.response.data.non_field_errors)

  const handleLogin = (event) => {
    event.preventDefault();
    props.dispatch(loginUser(inputs))
  }

  const handleRegistration = (event) => {
    event.preventDefault();
    props.dispatch(UserRegistration(inputs))
  }

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt='logo' className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>Bric Admin</Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Tabs
            value='0'
            onChange={handleChange}
            indicatorColor='primary'
            textColor='primary'
            centered
          >
            <Tab label='Login' classes={{ root: classes.tab }} />
            <Tab label='New User' classes={{ root: classes.tab }} />
          </Tabs>
          {value === 0 && (
            <React.Fragment>
              <Typography variant='h1' className={classes.greeting}>
                Welcome Back, User
            </Typography>
              <Typography color='secondary' className={classes.errorMessage}>
                {props.error.response && props.error.response.data.non_field_errors}
              </Typography>
              {
                [
                  { holder: 'Username', type: 'text', name: 'username', input: inputs.username },
                  { holder: 'Password', type: 'password', name: 'password', input: inputs.password },
                ].map((v, i) => {
                  return (
                    <TextField
                      key={i}
                      name={v.name}
                      InputProps={{
                        classes: {
                          underline: classes.textFieldUnderline,
                          input: classes.textField
                        }
                      }}
                      value={v.input}
                      onChange={handleInputChange}
                      margin='normal'
                      placeholder={v.holder}
                      type={v.type}
                      fullWidth
                    />
                  )
                })
              }
              <div className={classes.formButtons}>
                {props.isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                    <Button
                      onClick={(e) => handleLogin(e)}
                      variant='contained'
                      color='primary'
                      size='large'
                    >
                      Login
                </Button>
                  )}
                <Button
                  color='primary'
                  size='large'
                  className={classes.forgetButton}
                >
                  Forget Password
              </Button>
              </div>
            </React.Fragment>)}
          {value === 1 && (
            <React.Fragment>
              <Typography variant='h1' className={classes.greeting}>
                Welcome!
            </Typography>
              {
                [
                  { holder: 'Username', type: 'text', name: 'username', input: inputs.username },
                  { holder: 'Email address', type: 'email', name: 'email', input: inputs.email },
                  { holder: 'Birth day', type: 'date', name: 'birth_date', input: inputs.birth_date },
                  { holder: 'Password', type: 'password', name: 'password', input: inputs.password },
                  { holder: 'Password confirmation', type: 'password', name: 'password_2', input: inputs.password_2 }
                ].map((v, i) => {
                  return (
                    <div key={i} className='form-label-group'>
                      <TextField
                        key={i}
                        name={v.name}
                        InputProps={{
                          classes: {
                            underline: classes.textFieldUnderline,
                            input: classes.textField
                          }
                        }}
                        value={v.input}
                        onChange={handleInputChange}
                        margin='normal'
                        placeholder={v.holder}
                        type={v.type}
                        fullWidth
                      />
                      {
                        props.error.response &&
                        <Typography color='secondary' className={classes.errorMessage}>
                          {props.error.response.data[v.name]}
                        </Typography>
                      }
                    </div>
                  )
                })
              }

              <div className={classes.creatingButtonContainer}>
                {props.isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                    <Button
                      onClick={(e) => handleRegistration(e)}
                      size='large'
                      variant='contained'
                      color='primary'
                      fullWidth
                      className={classes.createAccountButton}
                    >
                      Create your account
                </Button>
                  )}
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </Grid>)
};


const styles = theme => ({
  container: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0
  },
  logotypeContainer: {
    backgroundColor: theme.palette.primary.main,
    width: '60%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      width: '50%'
    },
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  logotypeImage: {
    width: 165,
    marginBottom: theme.spacing.unit * 4
  },
  logotypeText: {
    color: 'white',
    fontWeight: 500,
    fontSize: 84,
    [theme.breakpoints.down('md')]: {
      fontSize: 48
    }
  },
  formContainer: {
    width: '40%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      width: '50%'
    }
  },
  form: {
    width: 320
  },
  tab: {
    fontWeight: 400,
    fontSize: 18
  },
  greeting: {
    fontWeight: 500,
    textAlign: 'center',
    marginTop: theme.spacing.unit * 4
  },
  subGreeting: {
    fontWeight: 500,
    textAlign: 'center',
    marginTop: theme.spacing.unit * 2
  },
  creatingButtonContainer: {
    marginTop: theme.spacing.unit * 2.5,
    height: 46,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  createAccountButton: {
    height: 46,
    textTransform: 'none'
  },
  errorMessage: {
    textAlign: 'center',
    marginTop: '20px'
  },
  textFieldUnderline: {
    '&:before': {
      borderBottomColor: theme.palette.primary.light
    },
    '&:after': {
      borderBottomColor: theme.palette.primary.main
    },
    '&:hover:before': {
      borderBottomColor: `${theme.palette.primary.light} !important`
    }
  },
  textField: {
    borderBottomColor: theme.palette.background.light
  },
  formButtons: {
    width: '100%',
    marginTop: theme.spacing.unit * 4,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  forgetButton: {
    textTransform: 'none',
    fontWeight: 400
  },
  loginLoader: {
    marginLeft: theme.spacing.unit * 4
  },
  copyright: {
    marginTop: theme.spacing.unit * 4,
    whiteSpace: 'nowrap',
    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      bottom: theme.spacing.unit * 2,
    }
  }
});


const stateProps = (state) => {
  return {
    isLoading: state.auth.isLoading,
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error
  }
}

const styledComponent = withStyles(styles)(LoginView);
export default connect(stateProps)(styledComponent);