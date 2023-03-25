import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../utils/AuthContext';

const PublicRoute = ({ children }) => {
    let { user } = useContext(AuthContext);

    if ((user && user.role === 'User') || (user && user.role === 'Admin')) {
        return <Navigate to='/' replace />;
    }

    return children ? children : <Outlet />;
}

export default PublicRoute;