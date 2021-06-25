import { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import routes from 'Routes/constants';
import storage from 'services/storage';

const withAuth = <P extends Record<string, unknown>>(
  Component: React.ComponentType<P>
): React.ComponentType<P> => (props) => {
  const isAuthenticated = !!storage.getCredentials()?.token;
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
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

  if (isAuthenticated) {
    /* eslint-disable react/jsx-props-no-spreading */
    return <Component {...props} />;
  }
  return null;
};

export default withAuth;
