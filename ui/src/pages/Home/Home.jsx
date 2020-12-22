import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  text: {
    width: '50vw'
  }
}));

function Home() {
  const classes = useStyles();

  return (
    <div className={classes.main} data-cy="home-titulo">
      <Typography variant="h4" align="center" className={classes.text}>
        Este é um projeto de exemplo para execução de testes integrados com Cucumber e Cypress
      </Typography>
    </div>
  );
}

export default Home;
