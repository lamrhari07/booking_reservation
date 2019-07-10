import { withTheme } from '@material-ui/core/styles';
import { compose, withState, withHandlers, lifecycle }  from 'recompose';
import { withRouter } from "react-router-dom";
import SidebarView from './SidebarView';

export default compose(
  withRouter,
  withTheme(),
  withState('isPermanent', 'setPermanent', true),
  withHandlers({
    handleWindowWidthChange: ({ isPermanent, setPermanent, theme }) => () => {
      const windowWidth = window.innerWidth;
      const breakpointWidth = theme.breakpoints.values.md;
      const isSmallScreen = windowWidth < breakpointWidth;

      if (isSmallScreen && isPermanent) {
        setPermanent(false);
      } else if (!isSmallScreen && !isPermanent) {
        setPermanent(true);
      }
    }
  }),
  lifecycle({
    componentWillMount() {
      window.addEventListener('resize', this.props.handleWindowWidthChange);
      this.props.handleWindowWidthChange();
    },
    componentWillUnmount() {
      window.removeEventListener('resize', this.props.handleWindowWidthChange);
    },
  }),
)(SidebarView);
