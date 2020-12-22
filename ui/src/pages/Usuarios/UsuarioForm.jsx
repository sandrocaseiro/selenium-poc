import React from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  TextField,
  Button,
  CircularProgress
} from '@material-ui/core';
import { Save as SaveIcon } from '@material-ui/icons';
import { useForm } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  form: {
    textAlign: 'right'
  },
  textField: {
    marginBottom: theme.spacing(2)
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
    display: 'inline'
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

function UsuarioForm(props) {
  const classes = useStyles();
  const {register,handleSubmit,errors} = useForm({mode: 'onBlur'});

  if (props.readOnly && props.usuario.id === '')
    return null;

  return (
    <form autoComplete="off" className={classes.form} onSubmit={handleSubmit(props.formSubmit)} data-cy="usuario-form">
      {props.readOnly && 
        <TextField
          inputProps={{
            readOnly: true,
          }}
          label="Id"
          variant="outlined"
          size="small"
          className={classes.textField}
          fullWidth
          value={props.usuario.id}
          data-cy="usuario-id"
          />
      }
      <TextField
        inputProps={{
          readOnly: props.readOnly,
        }}
        inputRef={
          register({
            required: 'Nome é obrigatório'
          })
        }
        name="nome"
        label="Nome"
        variant="outlined"
        size="small"
        className={classes.textField}
        error={errors.nome != null}
        helperText={errors.nome?.message}
        fullWidth
        value={props.usuario.nome}
        onChange={(e) => props.formValueChange('nome', e.target.value)}
        data-cy="usuario-nome"
        FormHelperTextProps={{
          'data-cy': 'input-error-msg'
        }}
        />
      {!props.readOnly &&
        <TextField
          inputProps={{
            readOnly: props.readOnly,
          }}
          inputRef={
            register({
              required: 'E-mail é obrigatório',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "E-mail inválido"
              }
            })
          }
          name="email"
          label="E-mail"
          variant="outlined"
          size="small"
          className={classes.textField}
          error={errors.email != null}
          helperText={errors.email?.message}
          fullWidth
          value={props.usuario.email}
          onChange={(e) => props.formValueChange('email', e.target.value)}
          data-cy="usuario-email"
          FormHelperTextProps={{
            'data-cy': 'input-error-msg'
          }}
          />
      }
      {!props.readOnly &&
        <div className={classes.wrapper}>
          <Button
              type="submit"
              variant="contained"
              color="secondary"
              size="medium"
              disabled={props.isSaving}
              startIcon={<SaveIcon />}
              data-cy="usuario-salvar">
              Salvar
            </Button>
            {props.isSaving && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
      }
    </form>
  );
}

UsuarioForm.defaultProps = {
  isSaving: false,
  readOnly: false
};

UsuarioForm.propTypes = {
  usuario: PropTypes.object,
  isSaving: PropTypes.bool,
  readOnly: PropTypes.bool,
  formValueChange: PropTypes.func,
  formSubmit: PropTypes.func
};

export default React.memo(UsuarioForm);
