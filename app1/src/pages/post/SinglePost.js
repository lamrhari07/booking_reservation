import React from 'react';

import { Grid, Button, Typography, withStyles } from '@material-ui/core';

function SinglePost({title, author, image, post, created_at, classes, handleDrawerClose}){
  
  return (
    <React.Fragment>
      <Grid container spacing={32} className={classes.postModal}>
        <Grid item xs={12}>
          <Button className={classes.close} onClick={handleDrawerClose}>
            Close
          </Button>
          <img width="100%" height="50%" src={image} alt=''/>
          <Typography gutterBottom variant="h2" component="h2">
           {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {author}, {created_at}
          </Typography>
          <span />
          <Typography variant="h1" color="textSecondary" component="p">
            {post}
        </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

const styles = theme => ({
  postModal: {
    position: 'relative',
    top: '40px',
    backgroundColor: '#fff',
  },
  close: {
    position: 'fixed',
    left: '150px',
    padding: '15px',
    color: 'white',
    backgroundColor: 'yellow',
    zIndex: '9'
  }
})

export default withStyles(styles)(SinglePost)