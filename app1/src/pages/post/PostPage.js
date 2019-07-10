import React from 'react';
import {
  Grid,
  CardActions,
  CardActionArea,
  CardMedia,
  Card,
  CardContent,
  Button,
  Typography,
  withStyles,
} from '@material-ui/core';

import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";
import { Route, Link } from 'react-router-dom';

import { Loading } from '../Loading';
import { FetchBlog } from '../../actions/blogAction';
import Drawer from 'react-drag-drawer';
import PageTitle from '../../components/PageTitle/PageTitle';
import SinglePost from './SinglePost';
import history from '../../utils/history';


const PostPage = ({ blog, classes }) => {
  const [open, setOpen] = React.useState(false);

  function handleDrawerOpen() {
    setOpen(true)
  }

  function handleDrawerClose() {
    setOpen(false)
    history.goBack()
  }

  const Post = ({ image, title, created_at }) => {
    return (
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {created_at}
          </Typography>
          <Typography gutterBottom variant="h4" component="h2">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    )
  }

  const postList = blog.data.map((e) => {
    return (
      e.results.map((result) => {
        return (
          <Grid key={result.id} item xs={12} md={3}>
            <Card className={classes.card}>
              <Post
                title={result.title.split('', 10)}
                created_at={result.created_at.split('T')[0]}
                image={result.post_image}
              />
              <CardActions>
                <Button
                  component={Link}
                  to={`/app/blog/${result.id}`}
                  onClick={handleDrawerOpen}
                  size="medium"
                  color="primary"
                >
                  Read more
                </Button>
              </CardActions>
            </Card>
            <Route path={`/app/blog/${result.id}`} render={() =>
              <Drawer
                open={open}
                onRequestClose={handleDrawerClose}
                modalElementClass={classes.modal}
              >
                <SinglePost
                  classes={classes}
                  handleDrawerClose={handleDrawerClose}
                  title={result.title}
                  post={result.post}
                  image={result.post_image}
                  created_at={result.created_at.split('T')[0]}
                  author={result.user.user.username}
                />
              </Drawer>
            } />
          </Grid>
        )
      })
    )
  })

  return (blog.isLoading ? <Loading /> :
    <React.Fragment>
      <PageTitle title="Posts" />
      <Grid container spacing={32}>
        {postList}
      </Grid>
    </React.Fragment>
  )
};


const styles = theme => ({
  card: {
    width: '100%',
  },
  media: {
    height: 140,
  },
  modal: {
    background: '#fff',
    paddingTop: '320px',
    textAlign: 'center',
    width: '100%',
    minHeight: '100%',
  },
})

const stateProps = (state) => {
  return {
    blog: state.blog,
  }
}

const PostsListWithData = lifecycle({
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(FetchBlog())
  },
});

const styledComponent = withStyles(styles)(PostPage)
export default compose(connect(stateProps), PostsListWithData)(styledComponent);
