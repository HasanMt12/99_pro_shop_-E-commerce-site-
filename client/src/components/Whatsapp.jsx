import WhatsAppWidget from 'react-whatsapp-chat-widget';
import "react-whatsapp-chat-widget/index.css";
import logo from '/logo.png'
const Whatsapp = () => {
    return (
        <WhatsAppWidget
        className="animate-ping"
            phoneNo="+8801602848424"
            position="right"
            widgetWidth="340px"
            widgetWidthMobile="260px"
            messageBox={true}
            messageBoxTxt="Hi Hasan, is there any related service available ?"
            iconSize="46"
            iconColor="#00BFFF"
            iconBgColor="#FFC3D0"
            headerIcon={logo}
            headerIconColor="pink"
            headerTxtColor="#333333"
            headerBgColor="#B0DDEF"
            headerTitle="99 Pro shop Team"
            headerCaption="Online"
            bodyBgColor="#F0F9FF"
            chatPersonName="Hasan mt support"
            chatMessage={<>Hi there 👋 <br /><br /> How can I help you? </>}
            footerBgColor="#B0DDEF"
            placeholder="Type a message.."
            btnBgColor="#FDF2F8"
            btnTxt="Start Chat"
            btnTxtColor="#0EA5E9"
        />
    );
};

export default Whatsapp;