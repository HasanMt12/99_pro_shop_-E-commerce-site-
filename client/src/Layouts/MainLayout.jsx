import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";
import MessengerCustomerChat from 'react-messenger-customer-chat';
const pageId = import.meta.env.VITE_IpageId;
const appId = import.meta.env.VITE_appId;
const MainLayout = () => {
     const location = useLocation();
    
    const noFooter = location.pathname.includes('login') || location.pathname.includes('register') || location.pathname.includes('waitingVerification') || location.pathname.includes('resetPass');
    const noHeader = location.pathname.includes('waitingVerification') || location.pathname.includes('resetPass');
    return (
        <>
           {noHeader || <Navbar></Navbar>}
            <Outlet></Outlet>
            <MessengerCustomerChat
                pageId={pageId}
                appId={appId} />
               
           {noFooter || <Footer></Footer>}
        </>
    );
};

export default MainLayout;