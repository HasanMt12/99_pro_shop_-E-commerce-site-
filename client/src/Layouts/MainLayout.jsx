import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";
import MessengerCustomerChat from 'react-messenger-customer-chat';
const MainLayout = () => {
     const location = useLocation();
    
    const noFooter = location.pathname.includes('login') || location.pathname.includes('register') || location.pathname.includes('waitingVerification') || location.pathname.includes('resetPass');
    const noHeader = location.pathname.includes('waitingVerification') || location.pathname.includes('resetPass');
    return (
        <>
           {noHeader ||  <Navbar></Navbar>}
            <Outlet></Outlet>
            <MessengerCustomerChat
                pageId="110262175394268"
                appId="248777968070010" />
               
           {noFooter || <Footer></Footer>}
        </>
    );
};

export default MainLayout;