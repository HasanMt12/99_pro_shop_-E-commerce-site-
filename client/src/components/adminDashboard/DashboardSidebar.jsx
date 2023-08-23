import { Link } from "react-router-dom";
import useAdmin from "../../hooks/useAdminSecurity";
import { useContext } from "react";
import { AuthContext } from "../../Authentication/AuthProvider";



const DashboardSidebar = () => {
  const {user}= useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email)

    return (
         <nav className="hs-accordion-group p-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
      <ul className="space-y-1.5">
        <li>
          <Link to="/dashboard" className="flex items-center gap-x-3.5 py-2 px-2.5  text-sm  rounded-md hover:bg-[#186584]  bg-[#6189a2]  text-white">
            <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path  d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
              <path  d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
            </svg>
            Dashboard
          </Link>
        </li>

    
        {isAdmin &&<>
          <li className="hs-accordion" id="account-accordion">
          <a className="hs-accordion-toggle flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:hover:bg-transparent text-sm text-white rounded-md  bg-[#6189a2]   hover:bg-[#186584]   hover:text-slate-300  hs-accordion-active:text-white" href="javascript:;">
           <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"></path>
            </svg>
            users 

            <svg className="hs-accordion-active:block ml-auto hidden w-3 h-3  group-hover:text-gray-100  text-white" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor"  ></path>
            </svg>

            <svg className="hs-accordion-active:hidden ml-auto block w-3 h-3  group-hover:text-gray-100  text-white" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor"  ></path>
            </svg>
          </a>

          <div id="account-accordion-child" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden">
            <ul className="pt-2 pl-2">
              <Link to = "/dashboard/users" >
              <li>
                <a className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-white rounded-md  bg-[#6189a2]   hover:text-slate-300" href="javascript:;">
                  All users
                </a>
              </li>
              </Link>
           
            </ul>
          </div>
        </li>
        
        </>}
      
      

        <li className="hs-accordion" id="projects-accordion">
          <a className="hs-accordion-toggle flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent text-sm text-white rounded-md  bg-[#6189a2]   hover:bg-[#186584]   hs-accordion-active:text-white" href="javascript:;">
            <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M1.5 0A1.5 1.5 0 0 0 0 1.5V13a1 1 0 0 0 1 1V1.5a.5.5 0 0 1 .5-.5H14a1 1 0 0 0-1-1H1.5z"></path>
              <path d="M3.5 2A1.5 1.5 0 0 0 2 3.5v11A1.5 1.5 0 0 0 3.5 16h6.086a1.5 1.5 0 0 0 1.06-.44l4.915-4.914A1.5 1.5 0 0 0 16 9.586V3.5A1.5 1.5 0 0 0 14.5 2h-11zM3 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5V9h-4.5A1.5 1.5 0 0 0 9 10.5V15H3.5a.5.5 0 0 1-.5-.5v-11zm7 11.293V10.5a.5.5 0 0 1 .5-.5h4.293L10 14.793z"></path>
            </svg>
            Products

            <svg className="hs-accordion-active:block ml-auto hidden w-3 h-3 text-white group-hover:text-gray-100  text-white" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor"  ></path>
            </svg>

            <svg className="hs-accordion-active:hidden ml-auto block w-3 h-3 text-white group-hover:text-gray-100  text-white" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor"  ></path>
            </svg>
          </a>

          <div id="projects-accordion-child" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden">
            <ul className="pt-2 pl-2">
                
            <Link to = "/dashboard/products" >
            <li>
                <a className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-white rounded-md  bg-[#6189a2]   text-slate-400  hover:text-slate-300" href="javascript:;">
                  All products
                </a>
              </li>
              </Link>
              <Link to="/dashboard/addProducts">
              <li>
                <a className="flex items-center gap-x-3.5 mt-2 py-2 px-2.5 text-sm text-white rounded-md  bg-[#6189a2]   text-slate-400  hover:text-slate-300" href="javascript:;">
                  Add Products
                </a>
              </li>
              </Link>
              {/* <li>
                <a className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-white rounded-md  bg-[#6189a2]   text-slate-400  hover:text-slate-300" href="javascript:;">
                  Link 3
                </a>
              </li> */}
            </ul>
          </div>
        </li>

        <li><a className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-white rounded-md   hover:bg-[#186584]  text-slate-400  hover:text-slate-300" href="javascript:;">
          <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
          </svg>
          Calendar
        </a></li>
       
      </ul>
    </nav>
    );
};

export default DashboardSidebar;