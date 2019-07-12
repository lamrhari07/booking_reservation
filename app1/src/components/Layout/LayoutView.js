import React from 'react';
import { withStyles, CssBaseline } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";

import Sidebar from '../Sidebar';

// pages
import Dashboard from '../../pages/dashboard/Dashboard';
import PostPage from '../../pages/post/PostPage';
import EditProfile from '../../pages/login/EditProfile';
import Header from '../Header/HeaderContainer';
import CreatePost from '../../pages/post/CreatePost';
import Reservation from '../../pages/reservation/Reservation';

const LayoutView = ({ classes, ...props }) => {

  const [open, setOpen] = React.useState(false);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <BrowserRouter>
        <React.Fragment>
          <Header open={open} setOpen={setOpen} data={props.data.data}/>
          <Sidebar open={open} setOpen={setOpen} />
          <div className={classnames(classes.content, { [classes.contentShift]: open })}>
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/app/dashboard" component={Dashboard} />
              <Route path="/app/blog" component={PostPage} />
              <Route path="/app/post/create" component={CreatePost} />
              <Route path="/app/profile" component={EditProfile} />
              <Route path="/app/reservation" component={Reservation} />
            </Switch>
          </div>
        </React.Fragment>
      </BrowserRouter>
    </div>
  );
}
const styles = theme => ({
  root: {
    display: 'flex',
    maxWidth: '100vw',
    overflowX: 'hidden',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    width: `calc(100vw - 240px)`,
    minHeight: '100vh',
  },
  contentShift: {
    width: `calc(100vw - ${240 + theme.spacing.unit * 6}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  }
});

const stateProps = (state) => {
  return {
    data: state.auth,
  }
}

const PostsListWithData = lifecycle({
  componentDidMount() {
    
  }
});

const styledComponent = withStyles(styles)(LayoutView);
export default compose(connect(stateProps), PostsListWithData)(styledComponent);

