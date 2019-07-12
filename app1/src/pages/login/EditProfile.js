import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";

import PageTitle from "../../components/PageTitle";
import { EditUserProfile } from "../../actions/authAction";

import {
    Grid,
    TextField,
    Divider,
    withStyles,
    Button,
} from "@material-ui/core";
import { Typography } from "@material-ui/core/es";
import WidgetView from "../../components/Widget";


const EditProfile = ({ classes, ...props }) => {
    const [user, setUser] = React.useState({});
    const [address, setAddress] = React.useState({});
    const [inputs, setInputs] = React.useState({});

    const handleInputChange = (event) => {
        event.persist();
        setInputs(inputs => (
            {
                ...inputs,
                [event.target.name]: event.target.value,
            }
        ));
    }

    const handleUserChange = (event) => {
        event.persist();
        setUser(user => (
            {
                ...user,
                [event.target.name]: event.target.value,
            }
        ));
    }


    const handleAddressChange = (event) => {
        event.persist();
        setAddress(address => (
            {
                ...address,
                [event.target.name]: event.target.value,
            }
        ));
    }

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        props.dispatch(EditUserProfile(user, address, inputs))
    }

    return (
        <React.Fragment>
            <PageTitle title='Edit Profile' />
            <Grid container spacing={32}>
                <Grid item xs={12}>
                    <WidgetView
                        disableWidgetMenu={true}
                        className={classes.card}
                        bodyClassNaclass={classes.fullHeightBody}
                    >
                        <form onSubmit={e => handleProfileUpdate(e)}>
                            {
                                [
                                    { holder: 'Username', type: 'text', name: 'username', input: user.user_dataname },
                                    { holder: 'First name', type: 'text', name: 'first_name', input: user.first_name },
                                    { holder: 'Last name', type: 'text', name: 'last_name', input: user.last_name },
                                    { holder: 'Email address', type: 'email', name: 'email', input: user.email }
                                ].map((v, i) => {
                                    return (
                                        <Grid key={i} container>
                                            <Grid item lg={4}>
                                                <Typography variant="h5" className={classes.text} weight="bold">
                                                    {v.holder}
                                                </Typography>
                                            </Grid>
                                            <Grid item lg={6}>
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
                                                    onChange={handleUserChange}
                                                    margin="normal"
                                                    placeholder={v.holder}
                                                    type={v.type}
                                                    fullWidth
                                                />
                                            </Grid>
                                        </Grid>
                                    )
                                })
                            }

                            {
                                [
                                    //{ holder: 'Avatar', type: 'file', name: 'avatar', input: inputs.avatar },
                                    { holder: 'Birth day', type: 'date', name: 'birth_date', input: inputs.birth_date },
                                    { holder: 'Phone number', type: 'number', name: 'phone', input: inputs.phone },
                                ].map((v, i) => {
                                    return (
                                        <Grid key={i} container>
                                            <Grid item lg={4}>
                                                <Typography variant="h5" className={classes.text} weight="bold">
                                                    {v.holder}
                                                </Typography>
                                            </Grid>
                                            <Grid item lg={6}>
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
                                                    margin="normal"
                                                    placeholder={v.holder}
                                                    type={v.type}
                                                    fullWidth
                                                />
                                            </Grid>
                                        </Grid>
                                    )
                                })
                            }
                            <Divider />
                            {
                                [
                                    { holder: 'Address', type: 'text', name: 'address_1', input: address.address_1 },
                                    { holder: 'City', type: 'text', name: 'city', input: address.city },
                                    { holder: 'Country', type: 'text', name: 'country', input: address.country }
                                ].map((v, i) => {
                                    return (
                                        <Grid key={i} container>
                                            <Grid item lg={4}>
                                                <Typography variant="h5" className={classes.text} weight="bold">
                                                    {v.holder}
                                                </Typography>
                                            </Grid>
                                            <Grid item lg={6}>
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
                                                    onChange={handleAddressChange}
                                                    margin="normal"
                                                    placeholder={v.holder}
                                                    type={v.type}
                                                    fullWidth
                                                />
                                            </Grid>
                                        </Grid>
                                    )
                                })
                            }
                            <br/>
                            <Button
                                type='submit'
                                variant='contained'
                                color='primary'
                                size='large'
                            >
                                Submit
                            </Button>
                        </form>
                    </WidgetView>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

const styles = theme => ({
    card: {
        minHeight: "100%",
        display: "flex",
        flexDirection: "column"
    },
    fullHeightBody: {
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        justifyContent: "space-between"
    },
    text: {
        margin: theme.spacing.unit * 3,
    },
    tableWidget: {
        overflowX: "auto"
    }
});


const styledComponent = withStyles(styles)(EditProfile);
export default compose(connect())(styledComponent);