import React from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Grid,
  Typography,
  Divider,
  Paper
} from '@material-ui/core';

const labelSpace = 3;
const valueSpace = 12 - labelSpace;

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
    width: '50vw'
  },
  label: {
    ...theme.typography.body1,
    fontWeight: theme.typography.fontWeightBold
  }
}));

function CepResult(props) {
  const classes = useStyles();

  if (props.data == null)
    return null;

  return (
    <Paper elevation={2} className={classes.container} data-cy="resultado-cep">
      <Grid container spacing={1}>
        <Grid item xs={labelSpace}>
          <span className={classes.label}>CEP:</span>
        </Grid>
        <Grid item xs={valueSpace}>
          <Typography variant="body1">{props.data.cep}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider component="hr" light={true} />
        </Grid>
        <Grid item xs={labelSpace}>
          <span className={classes.label}>Logradouro:</span>
        </Grid>
        <Grid item xs={valueSpace}>
          <Typography variant="body1">{props.data.logradouro}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider component="hr" light={true} />
        </Grid>
        <Grid item xs={labelSpace}>
          <span className={classes.label}>Bairro:</span>
        </Grid>
        <Grid item xs={valueSpace}>
          <Typography variant="body1">{props.data.bairro}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider component="hr" light={true} />
        </Grid>
        <Grid item xs={labelSpace}>
          <span className={classes.label}>Cidade:</span>
        </Grid>
        <Grid item xs={valueSpace}>
          <Typography variant="body1">{props.data.cidade}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider component="hr" light={true} />
        </Grid>
        <Grid item xs={labelSpace}>
          <span className={classes.label}>UF:</span>
        </Grid>
        <Grid item xs={valueSpace}>
          <Typography variant="body1">{props.data.uf}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

CepResult.defaultProps = {
  data: null
};

CepResult.propTypes = {
  data: PropTypes.object
};

export default React.memo(CepResult);
