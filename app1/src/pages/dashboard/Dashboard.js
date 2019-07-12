import React from "react";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";

import { UserProfile } from "../../actions/authAction";

import {
  Grid,
  withStyles,
} from "@material-ui/core";
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from '../../components/Wrappers';
import { Loading } from "../Loading";
import ReservationTable from "../reservation/reservationTable";

const Dashboard = ({ data, classes, theme }) => {



  const ProfileWidgit = data.data.map((e, i) => {
    return (e &&

      <React.Fragment>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <div className="userBlock">
            <div className="backgrounImg">
              <img src="https://preview.ibb.co/m4Fjb7/photography2.jpg" alt='' />
            </div>
            <div className="userImg">
              <img src={e.avatar} alt='' />
            </div>
            <div className="userDescription">
              <Typography variant="h5" className={classes.text} weight="bold">
                {e.user.username}
              </Typography>
              <p>{e.address.city}, {e.address.Country}</p>
            </div>
          </div>
        </Grid>
        <Grid item lg={8} md={8} sm={6} xs={12}>
          <Widget
            title="Your Information"
            upperTitle
            className={classes.card}
            bodyClassNclassName={classes.fullHeightBody}
          >
            <Grid container>
              <Grid item lg={4}>
                <Typography variant="h5" className={classes.text} weight="bold">
                  First name:
                      </Typography>
                <Typography variant="h5" className={classes.text} weight="bold">
                  Lirst name:
                    </Typography>
                <Typography variant="h5" className={classes.text} weight="bold">
                  Email Address:
                    </Typography>
                <Typography variant="h5" className={classes.text} weight="bold">
                  Phone number:
                    </Typography>
                <Typography variant="h5" className={classes.text} weight="bold">
                  Address:
                    </Typography>
              </Grid>
              <Grid item lg={7}>
                <Typography variant="h5" className={classes.text}>
                  {e.user.first_name}
                </Typography>
                <Typography variant="h5" className={classes.text}>
                  {e.user.last_name}
                </Typography>
                <Typography variant="h5" className={classes.text}>
                  {e.user.email}
                </Typography>
                <Typography variant="h5" className={classes.text}>
                  {e.phone}
                </Typography>
                <Typography variant="h5" className={classes.text}>
                  {e.address && e.address.address_1}
                </Typography>
              </Grid>
            </Grid>
          </Widget>
        </Grid>
      </React.Fragment>
    )
  }
  )

  return (
    <React.Fragment>
      <PageTitle title="Dashboard" button="Update Profile" to='/app/profile' />
      {data.isLoading ? <Loading />
        :
        <Grid container spacing={32} >
          {ProfileWidgit}
          <Grid item md={11} xs={12}>
            <Widget
              title="Invitation Table"
              upperTitle
              noBodyPadding
              bodyClassNclassName={classes.tableWidget}
              disableWidgetMenu
            >
              <ReservationTable />
            </Widget>
          </Grid>
        </Grid>
      }
    </React.Fragment>
  );
};

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

const stateProps = (state) => {
  return {
    data: state.auth,
  }
}

const PostsListWithData = lifecycle({
  componentDidMount() {
    this.props.dispatch(UserProfile())
  }
});

const styledComponent = withStyles(styles)(Dashboard);
export default compose(connect(stateProps), PostsListWithData)(styledComponent);


