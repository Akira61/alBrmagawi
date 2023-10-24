"use client";
import { useState } from "react";
import Head from "next/head";
import { configURL } from "../url.config";
export default function SideNavbar() {
  const [open, setOpen] = useState(true);

  const Menus = [
    // { title: "Dashboard", src: "Chart_fill" },
    // { title: "Inbox", src: "Chat" },
    // { title: "Accounts", src: "User" },
    { title: "My Courses ", icon: "Chart" },
    { title: "Create Course ", icon: "Chart" },
    {
      title: " ",
      id: Date.now(),
      icon: "User",
      dropdown: [
        { title: "All teachers", src: configURL.dashboard.admin.teacher.all },
        {
          title: "Accept teacher",
          src: configURL.dashboard.admin.teacher.acceptDenaied,
          icon: "",
        },
        { title: "Add teacher", src: configURL.dashboard.admin.teacher.add },
        // { title: "Edit teacher", src: "#" },
      ],
    },
    {
      title: "Students",
      id: Date.now(),
      icon: "User",
      dropdown: [
        { title: "All students", src: configURL.dashboard.admin.student.all },
        { title: "Add student", src: configURL.dashboard.admin.student.add },
        // { title: "Edit student", icon: "" },
      ],
    },
    {
      title: "Staff",
      id: Date.now(),
      icon: "User",
      dropdown: [
        { title: "All staff", src: configURL.dashboard.admin.staff.all },
        { title: "Add staff", src: configURL.dashboard.admin.staff.add },
        // { title: "Edit staff", icon: "" },
      ],
    },
    {
      title: "Course",
      id: Date.now(),
      icon: "Folder",
      dropdown: [{ title: "Add course", src: "#" }],
    },
    // { title: "Search", icon: "Search" },
    // { title: "Analytics", icon: "Chart" },
    // { title: "Files ", icon: "Folder" },
    { title: "Settings", icon: "Setting", gap: true, bottom: true },
    // { title: "Logout", icon: "Setting" },
  ];

  const teacher = [
    { title: "Create course ",src:'3', icon: "Chart" },
  ]
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/flowbite@1.5.1/dist/flowbite.min.css"
        />
      </Head>

      <nav className="fixed top-0 z-40 w-full ">
        <div className="px-3 py-3 lg:px-10 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start ">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 sm:hidden text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                onClick={() => setOpen(!open)}
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  />
                </svg>
              </button>
              {/* <a href="https://flowbite.com" className="flex ml-2 md:mr-24">
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="h-8 mr-3"
                  alt="FlowBite Logo"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  Flowbite
                </span>
              </a> */}
            </div>
            <div className="flex items-center">
              <div className="flex items-center ml-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      alt="user photo"
                    />
                  </button>
                </div>
                <div
                  className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                  id="dropdown-user"
                >
                  <div className="px-4 py-3" role="none">
                    <p
                      className="text-sm text-gray-900 dark:text-white"
                      role="none"
                    >
                      Neil Sims
                    </p>
                    <p
                      className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                      role="none"
                    >
                      neil.sims@flowbite.com
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Earnings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex z-40">
        {" "}
        {/*add 'fixed' to className*/}
        <div
          className={` overflow-y-auto overflow-x-hidden h-full ${
            open ? "w-72" : "hidden md:block md:w-20"
          } ${
            open ? "bg-gray-800" : ""
          } md:bg-gray-800 h-screen p-5  pt-8 relative duration-300`}
        >
          <img
            src="/icons/control.png"
            className={`absolute cursor-pointer ${
              open ? "-right-0" : ""
            } top-3 md:top-9 md:block w-8 mr-1 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
          <div className="flex gap-x-4 items-center">
            <a href="/">
              <img
                src="/logo.png"
                className={`${
                  !open && "rotate-[360deg] w-[1px]"
                } cursor-pointer w-48 mb-5 duration-500 ${
                  open && "rotate-[360deg]"
                }`}
              />
            </a>
            {/* <h1
              className={`text-white origin-left font-medium text-xl duration-200 ${
                !open && "scale-0"
              }`}
            >
              Designer
            </h1> */}
          </div>
          <div className={`${!open ? "pt-8" : ""} `}>
            <ul className="pt-6" onClick={() => setOpen(true)}>
              {Menus.map((Menu, index) => (
                <>
                  {Menu.dropdown ? (
                    <li key={index}>
                      <button
                        type="button"
                        className={`flex items-center ${
                          Menu.gap ? "mt-9" : "mt-2"
                        } ${
                          index === 0 && "bg-light-white"
                        } p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-200 ease-in-out  group hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700`}
                        aria-controls={`dropdown-${Menu.title}`}
                        data-collapse-toggle={`dropdown-${Menu.title}`}
                      >
                        {Menu.icon ? (
                          <img src={`/icons/${Menu.icon}.png`} />
                        ) : (
                          ""
                        )}
                        <span
                          className={`${
                            !open && "hidden"
                          } flex-1 ml-3 text-left text-lg font-semibold items-center whitespace-nowrap`}
                        >
                          {Menu.title}
                        </span>
                        <svg
                          aria-hidden="true"
                          className={`${!open && "hidden"} w-6 h-6`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <div className="">
                        <ul
                          id={`dropdown-${Menu.title}`}
                          className="hidden cursor-pointer py-2 space-y-2"
                        >
                          {Menu.dropdown.map((item, index) => (
                            <li key={index}>
                              <a
                                href={item.src}
                                className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 hover:underline dark:text-white dark:hover:bg-gray-700"
                              >
                                <>
                                  {item.icon ? (
                                    <img src={`/icons/${item.icon}.png`} />
                                  ) : (
                                    ""
                                  )}
                                  <span className="flex-1 ml-3 text-left">
                                    {item.title}
                                  </span>
                                </>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ) : (
                    <li
                      key={index}
                      className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-lg font-semibold transition duration-200 ease-in-out items-center gap-x-4 hover:bg-slate-600
                        ${Menu.gap ? "mt-9" : "mt-2"} ${
                        index === 0 && "bg-light-white"
                      } `}
                    >
                      <img src={`/icons/${Menu.icon}.png`} />
                      <h1
                        className={`${
                          !open && "hidden"
                        } origin-left duration-200 `}
                      >
                        {Menu.title}
                      </h1>
                    </li>
                  )}
                </>
              ))}

              {/* <li>
                <button
                  type="button"
                  className={`flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-700 ease-in-out  group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
                  aria-controls="dropdown-pages"
                  data-collapse-toggle="dropdown-pages"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span
                    className={`${
                      !open && "hidden"
                    } flex-1 ml-3 text-left whitespace-nowrap`}
                  >
                    Pages
                  </span>
                  <svg
                    aria-hidden="true"
                    className={`${!open && "hidden"} w-6 h-6`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <ul id="dropdown-pages" className="hidden py-2 space-y-2">
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      Kanban
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      Calendar
                    </a>
                  </li>
                </ul>
              </li> */}
              {/* <li>
                <button
                  type="button"
                  className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  aria-controls="dropdown-sales"
                  data-collapse-toggle="dropdown-sales"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span
                    className={`${
                      !open && "hidden"
                    } flex-1 ml-3 text-left whitespace-nowrap`}
                  >
                    Sales
                  </span>
                  <svg
                    aria-hidden="true"
                    className={`${!open && "hidden"} w-6 h-6`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <ul id="dropdown-sales" className="hidden py-2 space-y-2">
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      Products
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      Billing
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      Invoice
                    </a>
                  </li>
                </ul>
              </li> */}

              {/*
              {/* <li>
              <Dropdown label="Dropdown button">
                <Dropdown.Item>Dashboard</Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Item>Earnings</Dropdown.Item>
                <Dropdown.Item>Sign out</Dropdown.Item>
              </Dropdown>
            </li> */}
            </ul>
          </div>
        </div>
        {/* <div className="h-screen flex-1 p-7">
          <h1 className="text-2xl font-semibold ">Home Page</h1>
        </div> */}
      </div>
      
      <script src="https://unpkg.com/flowbite@1.5.1/dist/flowbite.js"></script>
    </>
  );
}
