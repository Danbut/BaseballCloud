import isNil from 'lodash/isNil';
import { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import routes from 'Routes/constants';
import storage from 'services/storage';

const withAuth = <P extends Record<string, unknown>>(
  Component: React.ComponentType<P>
): React.ComponentType<P> => (props) => {
  const isAuthenticated = !isNil(storage.getCredentials()?.token);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (
      !isAuthenticated &&
      !RegExp(
        `${routes.signIn}|${routes.signUp}|${routes.forgotPassword}|${routes.privacy}|${routes.terms}`
      ).test(location.pathname)
    ) {
      history.push(routes.signIn);
    }
    if (
      isAuthenticated &&
      RegExp(`${routes.signIn}|${routes.signUp}|${routes.forgotPassword}`).exec(
        location.pathname
      )
    ) {
      history.push(routes.profile);
    }
  }, [history, isAuthenticated, location.pathname]);

  /* eslint-disable react/jsx-props-no-spreading */
  return <Component {...props} />;
};

export default withAuth;
