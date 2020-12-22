import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

function Loading(props) {
  const classes = useStyles();
  
  if (props.isLoading)
    return <div className={classes.loadingContainer} data-cy="loader"><CircularProgress /></div>;
  else
    return props.children ?? null;
}

Loading.defaultProps = {
  isLoading: false
};

Loading.propTypes = {
  isLoading: PropTypes.bool
};

const areEqual = (prev, next) => prev.isLoading === next.isLoading && prev.children === next.children;

export default React.memo(Loading, areEqual);
