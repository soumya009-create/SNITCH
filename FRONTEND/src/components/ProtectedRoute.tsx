import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../auth/hooks';

interface ProtectedRouteProps {
    redirectPath?: string;
    allowedRole?: string;
}

const ProtectedRoute = ({ redirectPath = '/login', allowedRole = 'seller' }: ProtectedRouteProps) => {
    const { user, isAuthChecking } = useAuth() as any;

    // Show a loading state while fetching the session from /me
    if (isAuthChecking) {
        return (
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter' }}>
                Loading session...
            </div>
        );
    }

    // Redirect if not logged in
    if (!user) {
        return <Navigate to={redirectPath} replace />;
    }

    // Role-based protection: Check if user has the allowed role
    if (allowedRole && user.role !== allowedRole) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
