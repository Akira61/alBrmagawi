"use client";
import { useEffect, useMemo } from "react";
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
  const [filter, setFilter] = useState("");
  function closeModal() {
    setShowCTF(-1);
  }

  const categories = useMemo(
    () => [...new Set(ctfs.map((ctf) => ctf.catigory))],
    [ctfs],
  );

  const filteredCTFs = useMemo(
    () => (filter ? ctfs.filter((ctf) => ctf.catigory === filter) : ctfs),
    [ctfs, filter],
  );

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

  return (
    <>
      <Toaster />
      <section style={openSans.style} className="py-3 sm:py-20 bg-jaguar">
        <div className="px-4 mx-auto max-w-screen-2xl lg:px-12">
          <div className="relative overflow-hidden sm:rounded-lg">
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
                    <label for="filter" hidden>
                      Filter
                    </label>
                    <select
                      id="filter"
                      type="button"
                      className="flex items-center justify-center py-4 px-6 focus:outline-none"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    >
                      <option value="" selected>
                        All
                      </option>
                      {categories.map((ctg) => (
                        <option key={ctg} value={ctg}>
                          {ctg}
                        </option>
                      ))}
                    </select>
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
                    {filteredCTFs.length > 0 &&
                      filteredCTFs.map((ctf, index) => (
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
                  {filteredCTFs.length}
                </span>
              </span>
            </nav>
          </div>
        </div>
      </section>
    </>
  );
}
