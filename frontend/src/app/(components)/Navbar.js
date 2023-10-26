"use client";

import "../style/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import Box from "@/app/(components)/ctf/Box";
import Lines from "./ctf/Lines";

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

  useEffect(() => {
    userDetails();
  }, []);

  //get user details from token
  async function userDetails() {
    try {
      const { data } = await axios.get("/api/tokenData");
      // console.log("jwt token: ", data)
      return setUserData(data.data);
    } catch (error) {
      throw new console.log("error: ", error.message);
    }
  }

  return (
    <Lines  className="md:sticky top-4 z-50 container mb-16">
      <header className="px-4">
        <nav className="flex justify-between items-center py-2 container mx-auto">
          <div>
            <a href="/">Ceybarani</a>
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
                  {userData.first_name}
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
                <Box>
                  <a type="button" className="py-4 px-4" href="/register">
                    Get Started
                  </a>
                </Box>
              </>
            )}
            <FontAwesomeIcon
              className="text-3xl cursor-pointer md:hidden"
              icon={icon}
              onClick={(e) => ToggleMenu(e)}
            />
          </div>
        </nav>
      </header>
    </Lines>
  );
}
