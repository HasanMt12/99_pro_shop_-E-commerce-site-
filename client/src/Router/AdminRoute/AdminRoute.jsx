import { Navigate, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAdmin from "../../hooks/useAdmin";
import Loader from "../../components/Shared/Loader";
// import toast from "react-hot-toast";


const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();
    // Correct
// const showToast = () => {
//  toast.error("Only admin can Handle this rout.",
//        {
//         duration:3000
//        })
// };
    if(loading || isAdminLoading){
        return <Loader></Loader>
    }
    if (user && isAdmin) {
       return  children;
    }
    // if (!isAdmin) {
    //    showToast();
       
    // }
       return  <Navigate to="/" state={{from: location}} replace></Navigate>


};

export default AdminRoute;