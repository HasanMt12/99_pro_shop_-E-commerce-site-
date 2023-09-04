
import { SiFacebook} from "react-icons/si";
import { AiOutlineTwitter} from "react-icons/ai";
const Footer = () => {
    return (
        <>
        <div className= "relative bg-[#82c1da] pt-8 pb-6" >
  <div className="container mx-auto px-4">
    <div className="flex flex-wrap text-left lg:text-left">
      <div className="w-full lg:w-6/12 px-4">
        <h4 className="lg:text-2xl md:text-lg text-md font-semibold text-[#EA0F62]">Lets keep in touch!</h4>
        <h5 className="lg:text-lg md:text-sm text-[10px] mt-0 mb-2 text-[#fcfdfd]">
          Find us on any of these platforms, we respond 1-2 business days.
        </h5>
        <div className="mt-2 lg:mb-0 mb-6 flex gap-2">
          <a href="https://www.facebook.com/99ProShopBD" target="blank" className="flex bg-white lg:w-8 lg:h-8 w-6 h-6 hover:bg-[#d4a5b7] rounded-full p-2 justify-center items-center shadow-lg shadow-[#dbaabd]" >
            <SiFacebook className="flex justify-center  text-[#3b5998]"></SiFacebook>
            </a > 
            <button className="flex bg-white hover:bg-[#d4afbd] lg:w-8 lg:h-8 w-6 h-6 rounded-full p-2 justify-center items-center shadow-lg shadow-[#dbaabd]" >
            <AiOutlineTwitter className="flex justify-center text-[#00acee]"></AiOutlineTwitter>
            </button > 
          
        </div>
      </div>
      <div className="w-full lg:w-6/12 px-4">
        <div className="flex  items-top mb-6">
          <div className="w-full lg:w-4/12 lg:px-4 ml-auto">
            <span className="block uppercase text-blueGray-500 lg:text-sm text-[8px] md:text-[10px] text-[#EA0F62] font-semibold mb-2">Useful Links</span>
            <ul className = "list-unstyled text-start " >
              <li>
                <a className="text-[#fcfdfd] hover:text-blueGray-800 font-semibold block pb-2 lg:text-sm md:text-[10px] text-[8px]" href="">About Us</a>
              </li>
              <li>
                <a className="text-[#fcfdfd] hover:text-blueGray-800 font-semibold block pb-2 lg:text-sm md:text-[10px] text-[8px]" href="">Blog</a>
              </li>
              <li>
                <a className="text-[#fcfdfd] hover:text-blueGray-800 font-semibold block pb-2 lg:text-sm md:text-[10px] text-[8px]" href="">Free Products</a>
              </li>
            </ul>
          </div>
          <div className="w-full lg:w-4/12 lg:px-4">
            <span className="block uppercase text-blueGray-500 lg:text-sm text-[8px] md:text-[10px] text-[#EA0F62] font-semibold mb-2">Other Resources</span>
            <ul className = "list-unstyled text-start " >
              <li>
                <a className="text-[#fcfdfd] hover:text-blueGray-800 font-semibold block pb-2 lg:text-sm md:text-[10px] text-[8px]" href="">Terms &amp; Conditions</a>
              </li>
              <li>
                <a className="text-[#fcfdfd] hover:text-blueGray-800 font-semibold block pb-2 lg:text-sm md:text-[10px] text-[8px]" href="">Privacy policy</a>
              </li>
              <li>
                <a className="text-[#fcfdfd] hover:text-blueGray-800 font-semibold block pb-2 lg:text-sm md:text-[10px] text-[8px]" href="">Contact Us</a>
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