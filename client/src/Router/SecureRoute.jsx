import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../components/Shared/Loader";

const SecureRoute = ({children}) => {
    const { user , loading} = useContext(AuthContext);

    const location = useLocation();
    if(loading) {
        return <Loader ></Loader>
    }
    if (user) {
      return <Navigate to="/" state={{from: location}} replace></Navigate>;
    }
      return children;

};

export default SecureRoute;