import { useAuthContext } from '../Context/AuthContext';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({children}){
    const {user, loading} = useAuthContext();

    if (loading){ return <h2>Is Loading...</h2>}

    if (!user){return <Navigate to="/"/>}

    return children;
}