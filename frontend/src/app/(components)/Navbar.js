"use client";

import "../style/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import Box from "@/app/(components)/ctf/Box";
import Lines from "./ctf/Lines";
import Logo from "@/app/assets/imgs/logo.png";
import Link from "next/link";

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
    <div className="bg-jaguar fixed top-2 left-0 right-0 z-50 container mb-16">
      <Lines>
        <header className="px-4">
          <nav className="flex justify-between items-center py-2 container mx-auto">
            <a className="flex gap-2 items-center" href="/">
              <img src={Logo.src} alt="logo" className="w-10 h-10" />
              Ceybarani
            </a>
            <div
              className={
                "md:static absolute duration-500 md:bg-inherit bg-gray-800 md:min-h-fit min-h-[60vh] left-0 md:w-auto w-full flex items-center px-5 shadow-xl " +
                menu
              }
            >
              <ul className="flex text-gray-400 md:flex-row flex-col md:items-center md:gap-[1vw] gap-8">
                {[
                  {
                    label: "Contact Us",
                    href: "/contact",
                  },
                  {
                    label: "Pricing",
                    href: "/pricing",
                  },
                  {
                    label: "Academy",
                    href: "/academy",
                  },
                  {
                    label: "Content Creators",
                    href: "#provides",
                  },
                  {
                    label: "Univercities",
                    href: "/univercities",
                  },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link className="hover:text-white" href={href}>
                        {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center gap-6">
              {userData ? (
                <a className="cta" href="/ctfs">
                  <button className=" bg-gradient-to-r from-sky-500 to-indigo-500 text-white px-5 py-2 rounded-sm hover:bg-slate-700">
                    {/* {userData.first_name} */}
                    CTFS
                  </button>
                </a>
              ) : (
                <>
                  <a href="/login" className="hover:underline">
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
    </div>
  );
}
