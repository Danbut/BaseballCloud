import Footer from 'components/app/Footer';
import Header from 'components/app/Header';
import React, { useEffect, VFC } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';
import 'sanitize.css';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { theme } from 'assets/styles/theme';
import {
  ForgotPassword,
  Leaderboard,
  NotFound,
  Privacy,
  Profile,
  SignIn,
  SignUp,
  Terms,
} from 'screens';
import { Grid } from 'shared';
import {
  faUser,
  faLock,
  faCheck,
  faChevronUp,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import storage from 'services/storage';
import Network from 'screens/Network';
import routes from './constants';

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
    width: 100%;
  }
    body {
      height: 100%;
      width: 100%;
      font-family: 'Lato', sans-serif;
      background-color: #cbcccd;
      color: #333;
      line-height: 1.1;
      -webkit-font-smoothing: antialiased;
    }
    #root {
      height: 100%;
    }
`;

const Routes: VFC = () => {
  const token = storage.getCredentials()?.token;

  useEffect(() => {
    library.add(faUser, faLock, faCheck, faChevronUp, faChevronDown);
  }, []);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Grid
          height="100%"
          gridTemplateColumns="auto 1fr"
          gridTemplateRows="auto 1fr auto"
          gridTemplateAreas="'hd hd' 'content content' 'ft ft'"
        >
          <Header />
          <Switch>
            <Route path={routes.terms}>
              <Terms />
            </Route>
            <Route path={routes.privacy}>
              <Privacy />
            </Route>
            <Route path={routes.signIn}>
              <SignIn />
            </Route>
            <Route path={routes.signUp}>
              <SignUp />
            </Route>
            <Route path={routes.forgotPassword}>
              <ForgotPassword />
            </Route>
            <Route
              exact
              path={`${routes.profile}/:id?`}
              render={(props) => (
                /* eslint-disable-next-line */
                <Profile {...props} key={props.location.key} />
              )}
            />
            <Route path={routes.network}>
              <Network />
            </Route>
            <Route path={routes.leaderboard}>
              <Leaderboard />
            </Route>
            <Route exact path={routes.root}>
              {token ? (
                <Redirect to={routes.profile} />
              ) : (
                <Redirect to={routes.signIn} />
              )}
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
          <Footer />
        </Grid>
      </ThemeProvider>
    </Router>
  );
};

export default Routes;
