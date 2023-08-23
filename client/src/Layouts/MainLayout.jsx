import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";
import MessengerCustomerChat from 'react-messenger-customer-chat';
const MainLayout = () => {
    return (
        <>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <MessengerCustomerChat
                pageId="110262175394268"
                appId="248777968070010"

            />
            <Footer></Footer>
        </>
    );
};

export default MainLayout;