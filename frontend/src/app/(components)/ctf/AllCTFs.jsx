"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { Open_Sans } from "next/font/google";
import React, { useState } from "react";
const openSans = Open_Sans({ subsets: ["cyrillic"] });
import { VscTerminalLinux } from "react-icons/vsc";
import { ImWindows } from "react-icons/im";
import { CTF } from "./CTF";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function AllCTFs() {
  const [showCTF, setShowCTF] = useState(-1);
  const [flag, setFlag] = useState("");

  function closeModal() {
    setShowCTF(-1);
  }

  function openModal(index) {
    setShowCTF(index);
  }
  const ctfs = [
    {
      id: 1,
      thumbnail:
        "https://www.hackthebox.com/storage/avatars/f86fcf4c1cfcc690b43f43e100f89718.png",
      title: "Aeswhat",
      level: "hard",
      rating: 5.0,
      userOwns: 0,
      systemOwns: 0,
      matchineType: "windows",
      description: "hmmmm!   author : Otoom",
    },
    {
      id: 2,
      thumbnail:
        "https://www.hackthebox.com/storage/avatars/a75ac8ed04e6e728547538bfa41cfc68.png",
      title: "Binary_1",
      level: "easy",
      rating: 2.0,
      userOwns: 0,
      systemOwns: 0,
      matchineType: "linux",
      description: `it looks familiar

      author : otoom`,
    },
    {
      id: 3,
      thumbnail:
        "https://www.hackthebox.com/storage/avatars/2ad5dcb2fb97e40f5e88a0d6fc569bdd.png",
      title: "Crack it",
      level: "medium",
      rating: 3.5,
      userOwns: 0,
      systemOwns: 0,
      matchineType: "windows",
      description: `!1 is False

      author : otoom`,
    },
    {
      id: 4,
      thumbnail:
        "https://www.hackthebox.com/storage/avatars/2ad5dcb2fb97e40f5e88a0d6fc569bdd.png",
      title: "CryptoAnalyst",
      level: "hard",
      rating: 5.0,
      userOwns: 0,
      systemOwns: 0,
      matchineType: "windows",
      description: `I found this clipping on the mathematics professor's desk

      can you help me to understand it ?!
      
      author : otoom`,
    },
    {
      id: 5,
      thumbnail:
        "https://www.hackthebox.com/storage/avatars/2ad5dcb2fb97e40f5e88a0d6fc569bdd.png",
      title: "FTW",
      level: "easy",
      rating: 3.0,
      userOwns: 0,
      systemOwns: 0,
      matchineType: "windows",
      description: ` what _ _ ?  you want to complete it :)

      author : otoom`,
    },
    {
      id: 6,
      thumbnail:
        "https://www.hackthebox.com/storage/avatars/2ad5dcb2fb97e40f5e88a0d6fc569bdd.png",
      title: "RSA101",
      level: "hard",
      rating: 4.5,
      userOwns: 0,
      systemOwns: 0,
      matchineType: "windows",
      description: `Break it !!

      author : otoom`,
    },
    {
      id: 7,
      thumbnail:
        "https://www.hackthebox.com/storage/avatars/2ad5dcb2fb97e40f5e88a0d6fc569bdd.png",
      title: "SHA-1",
      level: "medium",
      rating: 3.5,
      userOwns: 0,
      systemOwns: 0,
      matchineType: "windows",
      description: `This looks like a hash of some kind INTEL says,

      It is wrapped with brackets ' { } '
      Then a 4 letter l33t sp34k word
      Then a underscore '_' as a seperator
      Then end with 4 numbers.
      
      This is the Regex {[A-Za-z0-9]+_[0-9]+}
      Example: {c0d3_1234}
      
      Provide the answer in flag format ;)
      
      author : saif`,
    },
  ];

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
      if(data.err_message){
        return toast.error(data.err_message)
      }
      //check if first blood
      else if(data.firstBlood){
        toast.success(data.message)
        closeModal();
      }
      // if not fist blood but success
      else if(data.success){
        toast.success(data.message)
        closeModal()
      }
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <>
    <Toaster />
      <section
        style={openSans.style}
        className="bg-gray-50 dark:bg-gray-900 py-3 sm:py-20"
      >
        <div className="px-4 mx-auto max-w-screen-2xl lg:px-12">
          <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-900 sm:rounded-lg">
            <>
              <div class="max-w-screen-md mb-8 lg:mb-16">
                <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                  Designed for business teams like yours
                </h2>
                <p class="text-gray-500 sm:text-xl dark:text-gray-400">
                  Here at Flowbite we focus on markets where technology,
                  innovation, and capital can unlock long-term value and drive
                  economic growth.
                </p>
              </div>
            </>

            <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
              <div className="w-full md:w-1/2">
                <form className="flex items-center">
                  <label htmlFor="simple-search" className="sr-only ">
                    Search
                  </label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
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
                    <input
                      type="text"
                      id="simple-search"
                      className="bg-gray-50  focus:outline-none focus:border-none text-gray-900 text-sm rounded-lg  block w-full pl-10 p-2 dark:bg-gray-900  dark:placeholder-gray-400 dark:text-white"
                      placeholder="Search"
                      required=""
                    />
                  </div>
                </form>
              </div>
            </div>
            {/* table */}
            <div className="overflow-x-auto">
              <table className="w-full text-md text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      machine
                    </th>
                    <th scope="col" className="px-4 py-3">
                      difficulty
                    </th>
                    <th scope="col" className="px-4 py-3">
                      rating
                    </th>
                    <th scope="col" className="px-4 py-3">
                      user owns
                    </th>
                    <th scope="col" className="px-4 py-3">
                      system owns
                    </th>
                    <th scope="col" class="px-4 py-3">
                      <span class="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ctfs.map((ctf, index) => (
                    <tr
                      onClick={() => openModal(index)}
                      className="border-b cursor-pointer dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <>
                        <Transition appear show={showCTF==index?true:false} as={Fragment}>
                          <Dialog
                            as="div"
                            className="relative z-10"
                            onClose={() => closeModal}
                          >
                            <Transition.Child
                              as={Fragment}
                              enter="ease-out duration-300"
                              enterFrom="opacity-0"
                              enterTo="opacity-100"
                              leave="ease-in duration-200"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <div className="fixed inset-0 bg-black bg-opacity-25" />
                            </Transition.Child>

                            <div className="fixed inset-0 overflow-y-auto">
                              <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                  as={Fragment}
                                  enter="ease-out duration-300"
                                  enterFrom="opacity-0 scale-95"
                                  enterTo="opacity-100 scale-100"
                                  leave="ease-in duration-200"
                                  leaveFrom="opacity-100 scale-100"
                                  leaveTo="opacity-0 scale-95"
                                >
                                  <Dialog.Panel className="w-full transform rounded-2xl p-10 bg-gray-800 text-left align-middle shadow-xl transition-all ">
                                    <Dialog.Title
                                      as="h3"
                                      className="flex bg-no-repeat max-w-full h-auto w-full text-lg font-medium leading-6 text-gray-900"
                                      // style={{backgroundImage: "url('https://www.hackthebox.com/storage/avatars/a75ac8ed04e6e728547538bfa41cfc68.png')"}}
                                    >
                                      <div className="flex items-center">
                                        <img
                                          src={
                                            "https://www.hackthebox.com/storage/avatars/a75ac8ed04e6e728547538bfa41cfc68.png"
                                          }
                                          alt="iMac Front Image"
                                          className="w-auto h-14 mr-3"
                                        />
                                        <span className="text-white">
                                          {ctf.title}
                                        </span>
                                      </div>
                                      <button
                                        type="button"
                                        onClick={closeModal}
                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                      >
                                        <svg
                                          aria-hidden="true"
                                          className="w-5 h-5"
                                          fill="currentColor"
                                          viewBox="0 0 20 20"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                        <span className="sr-only">
                                          Close modal
                                        </span>
                                      </button>
                                    </Dialog.Title>
                                    <div className="mt-2">
                                      <form>
                                        <dl>
                                          <h1 className="mb-2 pt-10 font-semibold leading-none text-gray-900 dark:text-white">
                                            Description
                                          </h1>
                                          <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
                                            {ctf.description}
                                          </dd>
                                          <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                                            Links
                                          </dt>
                                          <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
                                            Electronics/PC
                                          </dd>
                                        </dl>

                                        <div className="relative z-0 w-full mb-6 group">
                                          <input
                                            type="text"
                                            name="floating_email"
                                            id="floating_email"
                                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            placeholder=" "
                                            required=""
                                            onChange={(e) =>
                                              setFlag(e.target.value)
                                            }
                                          />
                                          <label
                                            htmlFor="floating_email"
                                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                          >
                                            Flag
                                          </label>
                                        </div>
                                      </form>
                                    </div>

                                    <div className="mt-4">
                                      <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white  hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={() => submitFlag(ctf.id)}
                                      >
                                        Submit flag
                                      </button>
                                      <button
                                        type="button"
                                        className="inline-flex mx-3 justify-center rounded-md border border-transparent bg-gray-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={closeModal}
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </Dialog.Panel>
                                </Transition.Child>
                              </div>
                            </div>
                          </Dialog>
                        </Transition>
                      </>

                      <th
                        scope="row"
                        className="flex items-center px-5 py-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <div className="relative">
                          <img
                            src={ctf.thumbnail}
                            alt="iMac Front Image"
                            className="w-auto h-12 mr-3"
                          />
                          {ctf.matchineType === "windows" ? (
                            <ImWindows
                              title="windows"
                              className="bottom-0 left-8 absolute  w-5 h-5 bg-gray-600 border-2 border-white dark:border-gray-800 rounded-full"
                            />
                          ) : ctf.matchineType === "linux" ? (
                            <VscTerminalLinux
                              title="linux"
                              className="bottom-0 left-8 absolute  w-5 h-5 bg-gray-600 border-2 border-white dark:border-gray-800 rounded-full"
                            />
                          ) : (
                            <img
                              src={ctf.thumbnail}
                              title="thumbnail"
                              className="bottom-0 left-8 absolute  w-6 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"
                            />
                          )}
                        </div>
                        <div className="px-1">
                          <p className="tracking-tight font-extrabold cursor-pointer hover:text-purple-500">
                            {ctf.title}
                          </p>
                          {/* <p className="text-sm uppercase text-gray-400">{ctf.level}</p> */}
                        </div>
                      </th>
                      <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="flex items-center">
                          <div
                            className={`inline-block w-4 h-4 mr-2 ${
                              ctf.level == "easy"
                                ? "bg-green-400"
                                : ctf.level == "medium"
                                ? "bg-orange-500"
                                : "bg-red-700"
                            } rounded-full`}
                          />
                          <span className="uppercase text-sm tracking-tight font-extrabold text-gray-500 dark:text-gray-400">
                            {ctf.level}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="flex items-center">
                          <>
                            <svg
                              aria-hidden="true"
                              className="w-5 h-5 text-yellow-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </>

                          <span className="ml-1 text-gray-500 tracking-tight font-extrabold dark:text-gray-400">
                            {ctf.rating}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="flex">
                          <svg
                            class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 18"
                          >
                            <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                          </svg>
                          <span className="text-gray-500 tracking-tight font-extrabold px-2 dark:text-gray-400">
                            {ctf.userOwns}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="flex">
                          <svg
                            class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 18 18"
                          >
                            <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                          </svg>

                          <span className="text-gray-500 tracking-tight font-extrabold px-2 dark:text-gray-400">
                            {ctf.systemOwns}
                          </span>
                        </div>
                      </td>
                      <td>
                        <svg
                          class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 16"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                          />
                        </svg>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
              {/* <ul className="inline-flex items-stretch -space-x-px">
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    1
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    2
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    aria-current="page"
                    className="z-10 flex items-center justify-center px-3 py-2 text-sm leading-tight border text-primary-600 bg-primary-50 border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                  >
                    3
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    ...
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    100
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
              </ul> */}
            </nav>
          </div>
        </div>
      </section>
    </>
  );
}
