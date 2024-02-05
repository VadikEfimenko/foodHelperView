import { useAuthContext } from '../../context/AuthProvider';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import './style.css'

export const PrivateRoute = () => {
    const { isAuthenticated, loading } = useAuthContext();
    const location = useLocation();

    if (loading) {
        return (
            <div className='loader'>
                Загрузка...
            </div>
        )
    }

    return (
        isAuthenticated ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
    );
}
