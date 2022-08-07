import { LoaderPage } from 'components/common/LoaderPage';
import { ROUTE } from 'consts';
import { selectIsLoading, selectIsLogged } from 'ducks/auth/selectors';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';

export const UserRoute: FC = () => {
  const isLogged = useSelector(selectIsLogged);
  const isLoading = useSelector(selectIsLoading);

  return (
    <>
      {isLoading && <LoaderPage />}
      {!isLoading &&
        (isLogged ? <Outlet /> : <Navigate to={ROUTE.AUTH} replace={true} />)}
    </>
  );
};
