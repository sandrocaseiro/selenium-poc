import React, { useEffect, useState } from 'react';
import {
  makeStyles,
  Paper
} from '@material-ui/core';
import {
  useParams,
  Redirect
} from 'react-router-dom';

import UsuarioForm from './UsuarioForm';
import Loading from '../../components/Loading/Loading';
import useAxios from '../../hooks/axios';
import withError from '../../hoc/withError';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center'
  },
  formContainer: {
    padding: theme.spacing(3),
    width: '50vw'
  },
}));

function Usuario() {
  const classes = useStyles();
  const params = useParams();
  const [formValues, setFormValues] = useState({
    id: '',
    nome: '',
    email: ''
  });
  const [saveApiCall, {isLoading: saveIsLoading, response: saveResponse}] = useAxios();
  const [getApiCall, {isLoading: getIsLoading, response: getResponse}] = useAxios();

  useEffect(() => {
    if (params.id != null)
      getApiCall(`/v1/usuarios/${params.id}`);
  }, []);

  useEffect(() => {
    if (getResponse != null && getResponse.status === 200)
      setFormValues({...getResponse.data.data});
  }, [getResponse]);

  if (saveResponse != null && saveResponse.status === 201)
      return <Redirect push to="/usuarios?msg=Usuário salvo com sucesso!" />;

  const handleFormValueChange = (field, value) => {
    setFormValues({
      ...formValues,
      [field]: value
    });
  };

  const handleSubmit = (e) => {
    saveApiCall({
      url: '/v1/usuarios',
      method: 'post',
      data: formValues
    });
  };

  return(
    <div className={classes.container}>
      <Loading isLoading={getIsLoading}>
        <Paper elevation={2} className={classes.formContainer}>
          <UsuarioForm usuario={formValues} readOnly={params.id != null} isSaving={saveIsLoading} formValueChange={handleFormValueChange} formSubmit={handleSubmit} />
        </Paper>
      </Loading>
    </div>
  );
}

export default withError(Usuario);
