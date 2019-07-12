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
    const [inputs, setInputs] = React.useState({file:{}});
    const [image, setImage] = React.useState({ preview: '', raw: '' })
    
    const handleChange = (e) => {
        setImage({
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0]
        })
    }

    function handlePostCreate(event) {
        const { dispatch } = props;
        event.preventDefault();
        dispatch(CreatePost(inputs))
    }

    function handleInputChange(event) {
        event.persist();

        setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }))
        
        console.log(inputs);
        
    }

    const InputForms = [
        { holder: 'Title', type: 'text', name: 'title', input: inputs.title },
        { holder: 'Post', type: 'text', name: 'post', input: inputs.post, multiline: true },
        { holder: 'Post image', type: 'file', name: 'post_image', input: inputs.post_image },
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
                    <h1>sksks {inputs.title}</h1>
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
