import React, { useState } from 'react';
import {
  makeStyles,
  Paper,
  TextField,
  Button
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import CepResult from './CepResult';
import Loading from '../../components/Loading/Loading';
import withError from '../../hoc/withError';
import useAxios from '../../hooks/axios';

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
  },
  formContainer: {
    padding: theme.spacing(3),
    margin: theme.spacing(4, 0)
  },
  form: {
    display: 'flex'
  },
  button: {
    margin: theme.spacing(0, 0, 0, 1)
  }
}));

function Cep() {
  const classes = useStyles();
  const [cep, setCep] = useState('');
  const [apiCall, {isLoading, response}] = useAxios();

  const handleSubmit = (e) => {
    e.preventDefault();

    apiCall(`/v1/cep/${cep}`);
  };

  return (
    <div className={classes.main} data-cy="page">
      <Paper elevation={2} className={classes.formContainer}>
        <form autoComplete="off" className={classes.form} onSubmit={handleSubmit}>
          <TextField
            label="CEP"
            variant="outlined"
            size="small"
            required
            defaultValue={cep}
            onChange={(e) => setCep(e.target.value)}
            inputProps={{
              'data-cy': 'input-cep'
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="medium"
            className={classes.button}
            startIcon={<SearchIcon />}
            data-cy="buscar-cep">
            Buscar
          </Button>
        </form>
      </Paper>
      <Loading isLoading={isLoading}>
        <CepResult data={response?.data?.data} />
      </Loading>
    </div>
  );
}

export default withError(Cep);
