"use client";
import { useEffect } from "react";
import { Open_Sans } from "next/font/google";
import React, { useState } from "react";
const openSans = Open_Sans({ subsets: ["cyrillic"] });
import axios from "axios";
import { Animator } from "@arwes/react-animator";
import { Text } from "@arwes/react-text";
import Table from "./Table";
import Box from "./Box";
import { createFrameOctagonClip } from "@arwes/frames";
import CTF from "./CTF";
import toast, { Toaster } from "react-hot-toast";

export default function AllCTFs() {
  const [showCTFId, setShowCTFId] = useState(-1);
  const [showCTF, setShowCTF] = useState(-1);
  const [flag, setFlag] = useState("");
  const [ctfs, setCtfs] = useState([]);
  function closeModal() {
    setShowCTF(-1);
  }

  //get first blood
  async function firstBlood() {
    try {
      const { data } = await axios.get("/api/ctfs/firstBlood");
      console.log(data);
    } catch (error) {
      console.log(window.location.pathname, error.message);
    }
  }

  useEffect(() => {
    // get all ctfs
    getCTFs();
    async function getCTFs() {
      try {
        const { data } = await axios.get(`/api/ctfs/getAll`);
        console.log(data);
        setCtfs(data.data);
      } catch (error) {
        console.log(error.message);
      }
    }
    //get first blood
    firstBlood();
  }, []);

  //submit flag
  async function submitFlag(ctfId) {
    try {
      const { data } = await axios.post(`/api/ctfs/submitFlag`, {
        ctfId: ctfId,
        flag: flag,
      });
      if (data.err_message) {
        return toast.error(data.err_message);
      }
      //check if first blood
      else if (data.firstBlood) {
        toast.success(data.message);
        closeModal();
      }
      // if not fist blood but success
      else if (data.success) {
        toast.success(data.message);
        closeModal();
      }
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  // const ctfs = [
  //   {
  //     id: 1,
  //     thumbnail:
  //       "https://www.hackthebox.com/storage/avatars/f86fcf4c1cfcc690b43f43e100f89718.png",
  //     title: "Aeswhat",
  //     level: "hard",
  //     rating: 5.0,
  //     userOwns: 0,
  //     systemOwns: 0,
  //     matchineType: "windows",
  //     description: "hmmmm!   author : Otoom",
  //     children: [
  //       {
  //         id: 8391,
  //         thumbnail:
  //           "https://www.hackthebox.com/storage/avatars/f86fcf4c1cfcc690b43f43e100f89718.png",
  //         title: "Aeswhat",
  //         level: "hard",
  //         rating: 5.0,
  //         userOwns: 0,
  //         systemOwns: 0,
  //         matchineType: "windows",
  //         description: "hmmmm!   author : Otoom",
  //       },
  //       {
  //         id: 8389,
  //         thumbnail:
  //           "https://www.hackthebox.com/storage/avatars/f86fcf4c1cfcc690b43f43e100f89718.png",
  //         title: "Aeswhat",
  //         level: "hard",
  //         rating: 5.0,
  //         userOwns: 0,
  //         systemOwns: 0,
  //         matchineType: "windows",
  //         description: "hmmmm!   author : Otoom",
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     thumbnail:
  //       "https://www.hackthebox.com/storage/avatars/a75ac8ed04e6e728547538bfa41cfc68.png",
  //     title: "Binary_1",
  //     level: "easy",
  //     rating: 2.0,
  //     userOwns: 0,
  //     systemOwns: 0,
  //     matchineType: "linux",
  //     description: `it looks familiar

  //     author : otoom`,
  //     children: [
  //       {
  //         id: 887,
  //         thumbnail:
  //           "https://www.hackthebox.com/storage/avatars/f86fcf4c1cfcc690b43f43e100f89718.png",
  //         title: "Aeswhat",
  //         level: "hard",
  //         rating: 5.0,
  //         userOwns: 0,
  //         systemOwns: 0,
  //         matchineType: "windows",
  //         description: "hmmmm!   author : Otoom",
  //       },
  //       {
  //         id: 819,
  //         thumbnail:
  //           "https://www.hackthebox.com/storage/avatars/f86fcf4c1cfcc690b43f43e100f89718.png",
  //         title: "Aeswhat",
  //         level: "hard",
  //         rating: 5.0,
  //         userOwns: 0,
  //         systemOwns: 0,
  //         matchineType: "windows",
  //         description: "hmmmm!   author : Otoom",
  //       },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     thumbnail:
  //       "https://www.hackthebox.com/storage/avatars/2ad5dcb2fb97e40f5e88a0d6fc569bdd.png",
  //     title: "Crack it",
  //     level: "medium",
  //     rating: 3.5,
  //     userOwns: 0,
  //     systemOwns: 0,
  //     matchineType: "windows",
  //     description: `!1 is False

  //     author : otoom`,
  //   },
  //   {
  //     id: 4,
  //     thumbnail:
  //       "https://www.hackthebox.com/storage/avatars/2ad5dcb2fb97e40f5e88a0d6fc569bdd.png",
  //     title: "CryptoAnalyst",
  //     level: "hard",
  //     rating: 5.0,
  //     userOwns: 0,
  //     systemOwns: 0,
  //     matchineType: "windows",
  //     description: `I found this clipping on the mathematics professor's desk

  //     can you help me to understand it ?!

  //     author : otoom`,
  //   },
  //   {
  //     id: 5,
  //     thumbnail:
  //       "https://www.hackthebox.com/storage/avatars/2ad5dcb2fb97e40f5e88a0d6fc569bdd.png",
  //     title: "FTW",
  //     level: "easy",
  //     rating: 3.0,
  //     userOwns: 0,
  //     systemOwns: 0,
  //     matchineType: "windows",
  //     description: ` what _ _ ?  you want to complete it :)

  //     author : otoom`,
  //   },
  //   {
  //     id: 6,
  //     thumbnail:
  //       "https://www.hackthebox.com/storage/avatars/2ad5dcb2fb97e40f5e88a0d6fc569bdd.png",
  //     title: "RSA101",
  //     level: "hard",
  //     rating: 4.5,
  //     userOwns: 0,
  //     systemOwns: 0,
  //     matchineType: "windows",
  //     description: `Break it !!

  //     author : otoom`,
  //   },
  //   {
  //     id: 7,
  //     thumbnail:
  //       "https://www.hackthebox.com/storage/avatars/2ad5dcb2fb97e40f5e88a0d6fc569bdd.png",
  //     title: "SHA-1",
  //     level: "medium",
  //     rating: 3.5,
  //     userOwns: 0,
  //     systemOwns: 0,
  //     matchineType: "windows",
  //     description: `Break it !!

  //     author : otoom`,
  //   },
  // ];

  return (
    <>
      <Toaster />
      <section style={openSans.style} className="py-3 sm:py-20 bg-jaguar">
        <div className="px-4 mx-auto max-w-screen-2xl lg:px-12">
          <div className="relative overflow-hidden sm:rounded-lg">
            {/* <>
              <div class="max-w-screen-md mb-8 lg:mb-16">
                <Animator active={true} combine manager="sequence">
                  <Animator>
                    <Text className="mb-4 text-4xl tracking-tight font-extrabold text-jaguar dark:text-white">
                      Designed for business teams like yours
                    </Text>
                  </Animator>
                  <Animator>
                    <Text className="text-gray-500 text-xl dark:text-gray-400">
                      Here at Flowbite we focus on markets where technology,
                      innovation, and capital can unlock long-term value and
                      drive economic growth.
                    </Text>
                  </Animator>
                </Animator>
              </div>
            </> */}

            <div className="flex flex-col px-8 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
              <div className="w-full md:w-1/2">
                <form className="flex items-center">
                  <label htmlFor="simple-search" className="sr-only ">
                    Search
                  </label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <Box>
                      <input
                        type="text"
                        id="simple-search"
                        className="bg-transparent py-4 ml-4 px-6 focus:outline-none focus:border-none text-white text-sm rounded-lg  block w-full pl-10 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Search"
                        required=""
                      />
                    </Box>
                  </div>
                </form>
              </div>

              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <div className="flex items-center space-x-3 w-full md:w-auto">
                  <Box>
                    <button
                      id="actionsDropdownButton"
                      data-dropdown-toggle="actionsDropdown"
                      className="flex items-center justify-center py-4 px-6"
                      type="button"
                    >
                      <svg
                        className="-ml-1 mr-1.5 w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          clipRule="evenodd"
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        />
                      </svg>
                      Actions
                    </button>
                  </Box>
                  <div
                    id="actionsDropdown"
                    className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-american-purple dark:divide-gray-600"
                  >
                    <ul
                      className="py-1 text-sm text-american-purple dark:text-gray-200"
                      aria-labelledby="actionsDropdownButton"
                    >
                      <li>
                        <a
                          href="#"
                          className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Mass Edit
                        </a>
                      </li>
                    </ul>
                    <div className="py-1">
                      <a
                        href="#"
                        className="block py-2 px-4 text-sm text-american-purple hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Delete all
                      </a>
                    </div>
                  </div>
                  <Box>
                    <button
                      id="filterDropdownButton"
                      data-dropdown-toggle="filterDropdown"
                      className="flex items-center justify-center py-4 px-6"
                      type="button"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="h-4 w-4 mr-2 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Filter
                      <svg
                        className="-mr-1 ml-1.5 w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          clipRule="evenodd"
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        />
                      </svg>
                    </button>
                  </Box>
                  <div
                    id="filterDropdown"
                    className="z-10 hidden w-48 p-3 bg-white rounded-lg shadow dark:bg-american-purple"
                  >
                    <h6 className="mb-3 text-sm font-medium text-jaguar dark:text-white">
                      Choose brand
                    </h6>
                    <ul
                      className="space-y-2 text-sm"
                      aria-labelledby="filterDropdownButton"
                    >
                      <li className="flex items-center">
                        <input
                          id="apple"
                          type="checkbox"
                          defaultValue=""
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-american-purple focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="apple"
                          className="ml-2 text-sm font-medium text-jaguar dark:text-gray-100"
                        >
                          Apple (56)
                        </label>
                      </li>
                      <li className="flex items-center">
                        <input
                          id="fitbit"
                          type="checkbox"
                          defaultValue=""
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-american-purple focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="fitbit"
                          className="ml-2 text-sm font-medium text-jaguar dark:text-gray-100"
                        >
                          Microsoft (16)
                        </label>
                      </li>
                      <li className="flex items-center">
                        <input
                          id="razor"
                          type="checkbox"
                          defaultValue=""
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-american-purple focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="razor"
                          className="ml-2 text-sm font-medium text-jaguar dark:text-gray-100"
                        >
                          Razor (49)
                        </label>
                      </li>
                      <li className="flex items-center">
                        <input
                          id="nikon"
                          type="checkbox"
                          defaultValue=""
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-american-purple focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="nikon"
                          className="ml-2 text-sm font-medium text-jaguar dark:text-gray-100"
                        >
                          Nikon (12)
                        </label>
                      </li>
                      <li className="flex items-center">
                        <input
                          id="benq"
                          type="checkbox"
                          defaultValue=""
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-american-purple focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="benq"
                          className="ml-2 text-sm font-medium text-jaguar dark:text-gray-100"
                        >
                          BenQ (74)
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Table>
                <table
                  style={{
                    clipPath: createFrameOctagonClip({ squareSize: "1rem" }),
                  }}
                  className="w-full text-md text-left bg-jaguar border-collapse"
                >
                  <thead className="text-xs uppercase dark:bg-russian-violet">
                    <tr className="rounded-lg">
                      <th scope="col" className="p-4">
                        machine
                      </th>
                      <th scope="col" className="p-4">
                        difficulty
                      </th>
                      <th scope="col" className="p-4">
                        rating
                      </th>
                      <th scope="col" className="p-4">
                        user owns
                      </th>
                      <th scope="col" className="p-4">
                        system owns
                      </th>
                      <th scope="col" class="p-4">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-jaguar">
                    {ctfs.length > 0 &&
                      ctfs.map((ctf, index) => (
                        <CTF
                          key={index}
                          ctf={ctf}
                          id={ctf.id}
                          showCTFId={showCTFId}
                          setShowCTFId={setShowCTFId}
                        />
                      ))}
                  </tbody>
                </table>
              </Table>
            </div>
            <nav
              className="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
              aria-label="Table navigation"
            >
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                <span className="tracking-tight font-extrabold">TOTAL</span>{" "}
                <span className="text-white mx-1 tracking-tight font-extrabold">
                  {ctfs.length}
                </span>
              </span>
            </nav>
          </div>
        </div>
      </section>
    </>
  );
}
