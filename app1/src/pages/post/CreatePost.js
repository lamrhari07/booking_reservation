import React from 'react';
import {
    Grid,
    CircularProgress,
    Button,
    TextField,
    withStyles,
} from '@material-ui/core';

import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";

import { CreatePost } from '../../actions/blogAction';
import WidgetContainer from '../../components/Widget/WidgetContainer';


const PostCreate = ({ error, classes, ...props }) => {
    const [image, setImage] = React.useState('');
    const [inputs, setInputs] = React.useState({});

    const handleChange = (event) => {
        event.persist();
        setImage(event.target.files[0])
    }

    console.log(image);
    function handlePostCreate(event) {
        const { dispatch } = props;
        event.preventDefault();
        dispatch(CreatePost(inputs))
    }

    function handleInputChange(event) {
        event.persist();
        setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }))
    }

    const InputForms = [
        { holder: 'Title', type: 'text', name: 'title', input: inputs.title },
        { holder: 'Post', type: 'text', name: 'post', input: inputs.post, multiline: true },
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
                <Grid item xs={12} md={12} lg={6}>
                    <WidgetContainer>
                        <TextField
                            name='post_image'
                            InputProps={{
                                classes: {
                                    underline: classes.textFieldUnderline,
                                    input: classes.textField
                                }
                            }}
                            onChange={handleChange}
                            margin='normal'
                            placeholder='Post image'
                            type='file'
                        />
                        {InputForms}
                        {props.isLoading ? (
                            <CircularProgress size={26} className={classes.loginLoader} />
                        ) : (
                                <Button
                                    className={classes.loader}
                                    onClick={(event) => handlePostCreate(event)}
                                    variant='contained'
                                    color='primary'
                                    size='large'
                                >
                                    Create Post
                            </Button>
                            )}
                    </WidgetContainer>
                </Grid>
                <Grid item>
                    <h1>Title: </h1>
                    <h3>{inputs.title}</h3>
                    
                    <h1>Post: </h1>
                    <h3>{inputs.post}</h3>
                </Grid>
            </Grid>
        </React.Fragment>
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
})

const stateProps = (state) => {
    return {
        isLoading: state.blog.isLoading,
        error: state.blog.error,
    }
}

const PostsListWithData = lifecycle({
    componentDidMount() {
        
    },
});

const styledComponent = withStyles(styles)(PostCreate)
export default compose(connect(stateProps), PostsListWithData)(styledComponent);
