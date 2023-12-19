import { Navigate, useLocation, Outlet } from "react-router-dom";

export const RequireAuth = ({ allowedRoles }) => {
    const location = useLocation();

    return (
        allowedRoles.includes(localStorage.getItem('role'))
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
};
