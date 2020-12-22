import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  makeStyles,
  createMuiTheme,
  Drawer,
  AppBar,
  CssBaseline,
  Toolbar,
  Typography,
  List,
  ThemeProvider,
} from '@material-ui/core';
import { amber } from '@material-ui/core/colors';
import {
  Home as HomeIcon,
  Person as PersonIcon,
  Mail as MailIcon
} from '@material-ui/icons';

import ListItemLink from './components/ListItemLink/ListItemLink';

const Home = React.lazy(() => import('./pages/Home/Home'));
const Cep = React.lazy(() => import('./pages/Cep/Cep'));
const UsuariosLista = React.lazy(() => import('./pages/Usuarios/UsuariosLista'));
const Usuario = React.lazy(() => import('./pages/Usuarios/Usuario'));

const drawerWidth = 240;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: amber[700]
    },
    secondary: {
      main: '#005eff'
    }
  }
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              Projeto Exemplo
          </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          data-cy="menu"
          >
          <Toolbar />
          <div className={classes.drawerContainer}>
            <List>
              <ListItemLink to="/" primary="Home" icon={<HomeIcon />} data-cy="menu-item" />
              <ListItemLink to="/cep" primary="CEP" icon={<MailIcon />} data-cy="menu-item" />
              <ListItemLink to="/usuarios" primary="Usuários" icon={<PersonIcon />} data-cy="menu-item" />
            </List>
          </div>
        </Drawer>
        <main className={classes.content}>
          <Toolbar />
          <React.Suspense fallback={<p>Carregando...</p>}>
            <Switch>
              <Route exact path="/cep">
                <Cep />
              </Route>
              <Route exact path="/usuarios/novo">
                <Usuario />
              </Route>
              <Route exact path="/usuarios/:id">
                <Usuario />
              </Route>
              <Route exact path="/usuarios">
                <UsuariosLista />
              </Route>
              <Route>
                <Home />
              </Route>
            </Switch>
          </React.Suspense>
        </main>
      </ThemeProvider>
    </div>
  );
}

export default App;
