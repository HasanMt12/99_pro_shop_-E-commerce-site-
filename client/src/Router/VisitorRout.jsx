import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import useVisitor from '../hooks/useVIsitor';



const VisitorRoute = ({children}) => {
    const { user , loading} = useContext(AuthContext);
    const [isVisitor , isVisitorLoading] = useVisitor(user?.email);
    const location = useLocation();
    if(loading || isVisitorLoading) {
        return <progress className="progress w-56"></progress>
    }
    if (user && isVisitor) {
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>;

};

export default VisitorRoute;