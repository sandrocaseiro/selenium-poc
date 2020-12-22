import { useState } from 'react';
import http from '../services/http-service';

function useAxios() {
  const [callState, setCallState] = useState({
    isLoading: false,
    response: null,
    error: null
  });

  const dispatcher = (opts) => {
    http(opts).then(resp => {
      setCallState({
        response: resp,
        isLoading: false
      });
    })
    .catch(err => {
      setCallState({
        error: err,
        isLoading: false
      });
    });
    
    setCallState({ isLoading: true });
  };

  return [dispatcher, callState];
}

export default useAxios;
