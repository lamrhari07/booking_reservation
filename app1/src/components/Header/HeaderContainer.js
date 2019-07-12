import { compose, withState, withHandlers } from 'recompose';
import { connect } from "react-redux";

import HeaderView from './HeaderView';
import { UserLogOut } from '../../actions/authAction';

export default compose(
  connect(),
  withState('profileMenu', 'setProfileMenu', null),
  withState('isSearchOpen', 'setSearchOpen', false),
  withHandlers({
    toggleSearch: props => () => {
      props.setSearchOpen(!props.isSearchOpen);
    },
    openProfileMenu: props => event => {
      props.setProfileMenu(event.currentTarget);
    },
    closeProfileMenu: props => () => {
      props.setProfileMenu(null);
    },
    handleLogout: props => () => {
      props.dispatch(UserLogOut())
    }
  })
)(HeaderView);