"use client";

import Head from "next/head";
import "../style/navbar.css";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faBarsStaggered,
  faXmark,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Navbar() {
  const [icon, setIcon] = useState(faBarsStaggered);
  const [menu, setMenu] = useState("top-[-100%]");
  const [userData, setUserData] = useState(false);
  function ToggleMenu(event) {
    //icon toggle
    icon == faBarsStaggered ? setIcon(faXmark) : setIcon(faBarsStaggered);
    //show and hide menu
    menu == "top-[-100%]" ? setMenu("top-[9%]") : setMenu("top-[-100%]");
  }

  useEffect(()=> {
    userDetails()
  },[])

  //get user details from token
  async function userDetails() {
    try {
      const { data } = await axios.get("/api/tokenData");
      setUserData(data);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  return (
    <>
      <header className="font-[Exo 2] md:sticky top-0 dark:bg-[#111927]">
        <nav className="flex justify-between items-center w-[92%] mx-auto py-5">
          <div>
            <a href="/">
              <img className="h-14 mr-3" src="/logo.png" alt="Albrmagawi" />
            </a>
          </div>
          <div
            className={
              "md:static absolute duration-500 md:bg-inherit bg-gray-800 md:min-h-fit min-h-[60vh] left-0 md:w-auto w-full flex items-center px-5 shadow-xl " +
              menu
            }
          >
            <ul className="flex text-gray-400 md:flex-row flex-col md:items-center md:gap-[1vw] gap-8">
              <li>
                <a className="hover:text-white" href="#">
                  Business
                </a>
              </li>
              <li>
                <a className="hover:text-white " href="#">
                  Hackers
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#">
                  Industries
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#">
                  Resources
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#">
                  Company
                </a>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-6">
            {userData ? (
              <a className="cta" href="/profile">
                <button className=" bg-gradient-to-r from-sky-500 to-indigo-500 text-white px-5 py-2 rounded-sm hover:bg-slate-700">
                  {userData.data.first_name}
                </button>
              </a>
            ) : (
              <>
                <a
                  href="/login"
                  className="hover:underline hover:cursor-pointer"
                >
                  Login
                </a>
                <a className="cta" href="/register">
                  <button className=" bg-gradient-to-r from-sky-500 to-indigo-500 text-white px-5 py-2 rounded-sm hover:bg-slate-700">
                    Get Started
                  </button>
                </a>
                <FontAwesomeIcon
                  className="text-3xl cursor-pointer md:hidden"
                  icon={icon}
                  onClick={(e) => ToggleMenu(e)}
                />
              </>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}

// <div className="wrapper">
//         <nav className="fixed w-full z-20 top-0 left-0 border-b border-hidden border-gray-200 dark:border-gray-600">
//           <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-6">
//             <a href="/" className="flex items-center">
//               <img
//                 src="/"
//                 className="h-16 mr-3"
//                 alt="Logo"
//               />

//             </a>
//             <div className="flex md:order-2">
//               <button
//                 type="button"
//                 className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//               >
//                 Get started
//               </button>
//               <button
//                 data-collapse-toggle="navbar-sticky"
//                 type="button"
//                 className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//                 aria-controls="navbar-sticky"
//                 aria-expanded="false"
//               >
//                 <span className="sr-only">Open main menu</span>
//                 <svg
//                   className="w-5 h-5"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 17 14"
//                 >
//                   <path
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M1 1h15M1 7h15M1 13h15"
//                   />
//                 </svg>
//               </button>
//             </div>
//             <div
//               className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
//               id="navbar-sticky"
//             >
//               <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
//                 <li>
//                   <a
//                     href="#"
//                     className="nav-items block py-2 pl-3 pr-4  rounded md:bg-transparent md:p-0"
//                     aria-current="page"
//                   >
//                     Home
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="nav-items block py-2 pl-3 pr-4  rounded  md:hover:bg-transparent  md:p-0  "
//                   >
//                     About
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="nav-items block py-2 pl-3 pr-4  md:p-0 "
//                   >
//                     Services
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="nav-items block py-2 pl-3 pr-4  rounded   md:p-0"
//                   >
//                     Contact
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </nav>
//       </div>
