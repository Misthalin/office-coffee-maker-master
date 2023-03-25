import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthConsumer } from "../utils/AuthContext.js";
import Loading from '../components/Loading/Loading';

const AdminRoute = ({ children }) => {
    let location = useLocation();
    return (
        <>
            <AuthConsumer>
                {({ isLoading, isAuth, user }) => (
                    <>
                        {isLoading && <Loading />}
                        {isAuth && (children ? children : <Outlet />)}
                        {user && user.role !== "Admin" && <Navigate to="/" state={{ from: location }} replace />}
                        {!isLoading && !isAuth && <Navigate to="/login" state={{ from: location }} replace />}
                    </>
                )}
            </AuthConsumer>
        </>
    )
}

export default AdminRoute;