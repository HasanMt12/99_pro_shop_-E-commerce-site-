import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";
import Whatsapp from "../components/Whatsapp";
// const pageId = import.meta.env.VITE_IpageId;
// const appId = import.meta.env.VITE_appId;
const MainLayout = () => {
     const location = useLocation();
    
    const noFooter = location.pathname.includes('login') || location.pathname.includes('register') || location.pathname.includes('waitingVerification') || location.pathname.includes('resetPass');
    const noHeader = location.pathname.includes('waitingVerification') || location.pathname.includes('resetPass') || location.pathname.includes('login') || location.pathname.includes('register');
    return (
        <div className="font-Lato">
           {noHeader || <Navbar></Navbar>}
            <Outlet></Outlet>
             <Whatsapp></Whatsapp>
           {noFooter || <Footer></Footer>}
        </div>
    );
};

export default MainLayout;