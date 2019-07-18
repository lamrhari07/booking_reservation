import React from 'react';
import {
    Grid,
    CircularProgress,
    Button,
    TextField,
    withStyles,
    Typography
} from '@material-ui/core';

import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";

import { MakeReservation } from '../../actions/resAction';
import WidgetContainer from '../../components/Widget/WidgetContainer';


const Reservations = ({ error, classes, ...props }) => {
    const [inputs, setInputs] = React.useState({})

    function handleReservationCreate(event) {
        const { dispatch } = props;
        event.preventDefault();
        dispatch(MakeReservation(inputs))
    }

    function handleInputChange(event) {
        event.persist();
        setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }))
    }

    const InputForms = [
        { holder: 'First name: ', type: 'text', name: 'first_name', input: inputs.first_name },
        { holder: 'Last name: ', type: 'text', name: 'last_name', input: inputs.last_name },
        { holder: 'Email address: ', type: 'email', name: 'email', input: inputs.email },
        { holder: 'Reservation date: ', type: 'date', name: 'reserved_start_date', input: inputs.reserved_start_date },
        { holder: 'Observation: ', type: 'text', name: 'observation', input: inputs.observation, multiline: true },
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
                multiline={v.multiline}
            />
        )
    })

    return (
        <React.Fragment>
            <Grid container spacing={32}>
                <Grid item xs={12} md={12} lg={4}>
                    <WidgetContainer
                        title="Reservation"
                        upperTitle
                        disableWidgetMenu
                    >
                        {InputForms}
                        {props.isLoading ? (
                            <CircularProgress size={26} className={classes.loginLoader} />
                        ) : (
                                <Button
                                    className={classes.loader}
                                    onClick={(event) => handleReservationCreate(event)}
                                    variant='contained'
                                    color='primary'
                                    size='large'
                                >
                                    Create Post
                            </Button>
                            )}
                        <Typography color='secondary' className={classes.errorMessage}>
                            {error.response && error.response.data}
                        </Typography>
                    </WidgetContainer>
                </Grid>
                <Grid item xs={12} md={12} lg={6}>
                    
                </Grid>
            </Grid>
        </React.Fragment >
    )
};


const styles = theme => ({
    card: {
        width: '100%',
    },
    loginLoader: {
        marginLeft: theme.spacing.unit * 4
    },
    loader: {
        marginTop: theme.spacing.unit * 4
    },
    errorMessage: {
      textAlign: 'center',
      marginTop: '20px'
    },
})

const stateProps = (state) => {
    return {
        isLoading: state.res.isLoading,
        error: state.res.error,
    }
}


const styledComponent = withStyles(styles)(Reservations)
export default connect(stateProps)(styledComponent);
