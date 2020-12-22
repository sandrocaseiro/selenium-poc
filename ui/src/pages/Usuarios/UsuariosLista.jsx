import React, { useEffect, useState } from 'react';
import {
  makeStyles,
  withStyles,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Snackbar
} from '@material-ui/core';
import { FindInPageOutlined as SearchIcon } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import Loading from '../../components/Loading/Loading';
import ButtonLink from '../../components/ButtonLink/ButtonLink';
import IconButtonLink from '../../components/IconButtonLink/IconButtonLink';
import useAxios from '../../hooks/axios';
import withError from '../../hoc/withError';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.primary
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center'
  },
  buttonNovo: {
    margin: theme.spacing(0, 0, 1)
  },
  table: {
    width: 650,
    textAlign: 'right'
  },
}));

function TableContent({isLoading, response, error}) {
  if (isLoading)
    return (
      <StyledTableRow>
        <TableCell colSpan={3}>
          <Loading isLoading={true} />
        </TableCell>
      </StyledTableRow>
    );
  else if (response != null && error == null)
    return (
      <React.Fragment>
        {response.data.data.usuarios.map(i => (
          <StyledTableRow key={i.id} data-cy="usuario-tabela-item">
              <TableCell align="center">{i.id}</TableCell>
              <TableCell align="center">{i.nome}</TableCell>
              <TableCell align="center"><IconButtonLink to={`/usuarios/${i.id}`} icon={<SearchIcon />} data-cy={`usuario-visualizar-${i.id}`} /></TableCell>
          </StyledTableRow>
        ))}
      </React.Fragment>
    );
  else
    return null;
}

function UsuariosLista() {
  const classes = useStyles();
  const [snackOpen, setSnackOpen] = useState(false);
  const location = useLocation();
  const [apiCall, {isLoading, response, error}] = useAxios();

  const params = queryString.parse(location.search);

  useEffect(() => {
    apiCall('/v1/usuarios');
  }, []);

  useEffect(() => {
    if (params.msg != null)
      setSnackOpen(true);
  }, [location, params.msg]);

  const handleSnackClose = () => setSnackOpen(false);

  return (
    <div className={classes.container}>
      <div className={classes.table}>
        <ButtonLink className={classes.buttonNovo} variant="contained" color="secondary" text="Novo" to="/usuarios/novo" data-cy="usuario-novo" />
        <TableContainer component={Paper}>
          <Table aria-label="simple table" data-cy="usuario-tabela">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Id</StyledTableCell>
                <StyledTableCell align="center">Nome</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                <TableContent isLoading={isLoading} response={response} error={error} />
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Snackbar open={snackOpen} autoHideDuration={1500} onClose={handleSnackClose} data-cy="alerta-sucesso">
        <Alert onClose={handleSnackClose} severity="success">{params.msg}</Alert>
      </Snackbar>
    </div>
  );
}

export default withError(UsuariosLista);
