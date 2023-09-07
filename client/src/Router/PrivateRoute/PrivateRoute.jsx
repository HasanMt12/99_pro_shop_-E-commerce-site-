import  { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import Loader from '../../components/Shared/Loader';



const PrivateRouts = ({children}) => {
    const { user , loading} = useContext(AuthContext);

    const location = useLocation();
    if(loading) {
        return <Loader></Loader>
    }
    if (user) {
        return children;
    }
    return <Navigate to="/register" state={{from: location}} replace></Navigate>;

};

export default PrivateRouts;