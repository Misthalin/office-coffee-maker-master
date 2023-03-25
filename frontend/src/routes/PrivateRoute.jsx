import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthConsumer } from "../utils/AuthContext.js";
import Loading from '../components/Loading/Loading';

const PrivateRoute = ({ children }) => {
  let location = useLocation();
  return (
    <>
      <AuthConsumer>
        {({ isLoading, isAuth }) => (
          <>
            {isLoading && <Loading />}
            {isAuth && (children ? children : <Outlet />)}
            {!isLoading && !isAuth && <Navigate to="/login" state={{ from: location }} replace />}
          </>
        )}
      </AuthConsumer>
    </>
  )
}

export default PrivateRoute;

