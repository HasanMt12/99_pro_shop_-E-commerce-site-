import { Link } from "react-router-dom";

const UserDashboardSidebar = () => {

    return (
         <nav className="hs-accordion-group p-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
      <ul className="space-y-1.5">
        <li>
          <Link to="/user-account" className="flex items-center gap-x-3.5 py-2 px-2.5  text-sm  rounded-md hover:bg-[#186584]  bg-[#6189a2]  text-white">
            <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path  d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
              <path  d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
            </svg>
            Dashboard
          </Link>
        </li>

    
             <Link to="/user-account/user-order" >
              <li>
                <a className="flex items-center my-2 gap-x-3.5 py-2 px-2.5 text-sm text-white rounded-md  bg-[#6189a2]   hover:text-slate-300" href="javascript:;">
                 My Order
                </a>
              </li>
              </Link>
              <Link to="/user-account/user-wishlist" >
              <li>
                <a className="flex items-center my-2 gap-x-3.5 py-2 px-2.5 text-sm text-white rounded-md  bg-[#6189a2]   hover:text-slate-300" href="javascript:;">
                 My Wishlist
                </a>
              </li>
              </Link>
        
       
      </ul>
    </nav>
    );
};

export default UserDashboardSidebar;