import Footer from 'shared/ui/Footer';
import Header from 'shared/ui/Header';
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
  NotFound,
  Privacy,
  Profile,
  SignIn,
  SignUp,
  Terms,
} from 'screens';
import { Grid } from 'shared';
import { faUser, faLock, faCheck } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import storage from 'services/storage';

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

const Navigation: VFC = () => {
  const token = storage.getCredentials()?.token;

  useEffect(() => {
    library.add(faUser, faLock, faCheck);
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
            <Route path="/legal/terms">
              <Terms />
            </Route>
            <Route path="/legal/privacy">
              <Privacy />
            </Route>
            <Route path="/login">
              <SignIn />
            </Route>
            <Route path="/registration">
              <SignUp />
            </Route>
            <Route path="/forgotpassword">
              <ForgotPassword />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route exact path="/">
              {token ? <Redirect to="/profile" /> : <Redirect to="/login" />}
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

export default Navigation;
