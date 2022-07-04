import { ROUTE } from 'consts';
import { selectIsLogged } from 'ducks/auth/selectors';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';

export const AuthRoute: FC = () => {
  const isLogged = useSelector(selectIsLogged);
  return !isLogged ? <Outlet /> : <Navigate to={ROUTE.HOME} replace={true} />;
};
