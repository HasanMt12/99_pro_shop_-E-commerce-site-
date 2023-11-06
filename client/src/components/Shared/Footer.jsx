import { SiFacebook} from "react-icons/si";
import { AiOutlineTwitter} from "react-icons/ai";
const Footer = () => {
    return (
        <>
        <div className= " bg-[#82c1da] lg:pt-8 md:pt-4 pt-2 pb-6 print:hidden" >
  <div className="container mx-auto px-4"> 
    <div className="flex flex-wrap text-left lg:text-left pb-2">
      <div className="w-full lg:w-6/12 px-4">
         <h2 className="bg-sky-100/60 rounded-2xl mb-2 text-center lg:w-[12rem] md:w-[10rem] w-[8rem] shadow-lg p-1 lg:text-xl md:text-lg text-sm text-sky-500">Lets keep in touch!</h2>
        <h5 className="lg:text-lg md:text-sm text-xs mt-0 mb-2 text-[#333333]">
          Find us on any of these platforms, we respond 1-2 business days.
        </h5>
        <div className="mt-2  lg:mb-4 mb-2 flex gap-2">
          <a href="https://www.facebook.com/99ProShopBD" target="blank" className="flex bg-white lg:w-8 lg:h-8 w-6 h-6 hover:bg-[#d4a5b7] rounded-full p-2 justify-center items-center shadow-lg shadow-[#dbaabd]" >
            <SiFacebook className="flex justify-center lg:text-md md:text-sm text-xs   text-[#3b5998]"></SiFacebook>
            </a > 
            <button className="flex bg-white hover:bg-[#d4afbd] lg:w-8 lg:h-8 w-6 h-6 rounded-full p-2 justify-center items-center shadow-lg shadow-[#dbaabd]" >
            <AiOutlineTwitter className="flex  lg:text-md md:text-sm text-xs justify-center text-[#00acee]"></AiOutlineTwitter>
            </button > 
          
        </div>
      </div>
      <div className="w-full lg:w-6/12 px-4">
        <div className="flex  items-top lg:mb-6 md:mb-3 mb-1">
          <div className="w-full lg:w-4/12 lg:px-4 ml-auto">
            <span className="block lg:text-sm text-xs md:text-xs bg-sky-100/60 rounded-2xl text-sky-500 p-1 text-center mb-2 lg:w-[12rem] md:w-[10rem] w-[8rem] shadow-sm">Useful Links</span>
            <ul className = "list-unstyled text-start " >
              <li>
                <a className="text-[#333333] hover:text-blueGray-800 font-medium block lg:pb-1 md:pb-1 pb-0 lg:text-sm md:text-xs text-xs" href="">About Us</a>
              </li>
              <li>
                <a className="text-[#333333] hover:text-blueGray-800 font-medium block lg:pb-1 md:pb-1 pb-0 lg:text-sm md:text-xs text-xs" href="">Blog</a>
              </li>
             
            </ul>
          </div>
          <div className="w-full lg:w-4/12 lg:px-4">
            <span className="block lg:text-sm text-xs md:text-xs bg-sky-100/60 rounded-2xl text-sky-500 text-center p-1  mb-2 lg:w-[12rem] md:w-[10rem] w-[8rem] shadow-sm">Other Resources</span>
            <ul className = "list-unstyled text-start " >
              <li>
                <a className="text-[#333333] hover:text-blueGray-800 font-medium block lg:pb-1 md:pb-1 pb-0 lg:text-sm md:text-xs text-xs" href="">Terms &amp; Conditions</a>
              </li>
              <li>
                <a className="text-[#333333] hover:text-blueGray-800 font-medium block lg:pb-1 md:pb-1 pb-0 lg:text-sm md:text-xs text-xs" href="">Privacy policy</a>
              </li>
             
            </ul>
          </div>
        </div>
      </div>
    </div>
    <hr className=" border-blueGray-300"/>
    <div className="flex flex-wrap items-center md:justify-between justify-center">
      <div className="w-full md:w-4/12 px-4 mx-auto text-center">
        <div className="text-sm text-blueGray-500 font-semibold py-1">
         
        </div>
      </div>
    </div>
  </div>
</div>
        </>
    );
};

export default Footer;