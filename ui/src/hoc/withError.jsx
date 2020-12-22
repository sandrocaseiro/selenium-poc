import React, { useEffect, useState } from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import http from '../services/http-service';

const withErrorHandler = (WrappedComponent) => {
  return props => {
    const [error, setError] = useState(null);
    const [attached, setAttached] = useState(false);

    useEffect(() => {
      const interceptor = http.interceptors.response.use(res => res,
      err => {
        setError(err.response.data.errors[0].description);
        return Promise.reject(err);
      });

      setAttached(true);
      return () => {
        http.interceptors.response.eject(interceptor);
      }
    }, []);

    const handleSnackClose = () => setError(null);

    return (
      <React.Fragment>
        { attached && <WrappedComponent {...props} /> }
        <Snackbar open={error != null} autoHideDuration={1500} onClose={handleSnackClose} data-cy="global-alert">
          <Alert severity="error" elevation={6} variant="filled" onClose={handleSnackClose}>
            {error}
          </Alert>
        </Snackbar>
      </React.Fragment>
    );
  }
}

export default withErrorHandler;
