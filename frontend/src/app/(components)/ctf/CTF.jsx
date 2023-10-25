"use client";
import { Dialog } from "@headlessui/react";
import React, { useState } from "react";
import { VscTerminalLinux } from "react-icons/vsc";
import { ImWindows } from "react-icons/im";
import { Animator } from "@arwes/react-animator";
import { Text } from "@arwes/react-text";
import Box from "./Box";
import Popup from "./Popup";
import { useConfetti } from "../../providers/Confetti";
import Link from "next/link";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const CTF = ({ ctf, showCTFId, setShowCTFId, indent = 0 }) => {
  const { activate } = useConfetti();
  const [flag, setFlag] = useState("");
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
        activate();
        toast.success(data.message);
        closeModal();
      }
      // if not fist blood but success
      else if (data.success) {
        activate();
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
      <tr
        onClick={() => {
          showCTFId === ctf.id ||
          ctf.children?.some((child) => child.id === showCTFId)
            ? setShowCTFId(-1)
            : setShowCTFId(ctf.id);
        }}
        className="cursor-pointer dark:hover:bg-russian-violet/30"
      >
        {!ctf.children?.length && showCTFId === ctf.id && (
          <>
            <Dialog
              as="div"
              className="relative z-10"
              open={true}
              onClose={() => setShowCTFId(-1)}
            >
              <div className="bg-black/20 fixed inset-0" />
              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full w-full max-w-4xl mx-auto items-center justify-center p-4 text-center">
                  <Popup>
                    <Dialog.Panel className="w-full transform p-10 text-left align-middle transition-all ">
                      <Dialog.Title
                        as="h3"
                        className="flex items-center bg-no-repeat max-w-full h-auto w-full text-lg font-medium leading-6 text-jaguar"
                        // style={{backgroundImage: "url('https://www.hackthebox.com/storage/avatars/a75ac8ed04e6e728547538bfa41cfc68.png')"}}
                      >
                        <div className="flex items-center flex-1">
                          <img
                            src={ctf.thumbnail}
                            alt="iMac Front Image"
                            className="w-auto h-14 mr-3"
                          />
                          <span className="text-white">{ctf.title}</span>
                        </div>
                        <Box>
                          <button
                            type="button"
                            onClick={() => setShowCTFId(-1)}
                            className="text-gray-400 bg-transparent p-4 text-sm"
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
                            <span className="sr-only">Close modal</span>
                          </button>
                        </Box>
                      </Dialog.Title>
                      <div className="mt-2">
                        <form>
                          <dl>
                            <Animator active={true} combine manager="sequence">
                              <Animator>
                                <Text
                                  as="h1"
                                  className="mb-2 pt-10 font-semibold leading-none text-jaguar dark:text-white"
                                >
                                  Description
                                </Text>
                              </Animator>
                              <Animator>
                                <Text
                                  as="dd"
                                  className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400"
                                >
                                  {ctf.description}
                                </Text>
                              </Animator>
                              {ctf.links ? (
                                <>
                                  <Text
                                    as="h1"
                                    className="mb-2 pt-10 font-semibold leading-none text-jaguar dark:text-white"
                                  >
                                    Links
                                  </Text>
                                  <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
                                    {JSON.parse(ctf.links).data.map((link, i) => (
                                      <div key={i}>
                                        <p >
                                          <Link
                                            target="_blank"
                                            className="underline"
                                            href={link.link}
                                          >
                                            {link.title}
                                          </Link>
                                        </p>
                                      </div>
                                    ))}
                                  </dd>
                                </>
                              ) : (
                                ""
                              )}
                            </Animator>
                          </dl>

                          <div className="relative z-0 w-full mb-6 group">
                            <input
                              type="text"
                              name="floating_email"
                              id="floating_email"
                              className="block py-2.5 px-0 w-full text-sm text-jaguar bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required=""
                              onChange={(e)=> setFlag(e.target.value)}
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

                      <div className="mt-4 flex items-center gap-4">
                        <Box>
                          <button
                            onClick={() => submitFlag(ctf.id)}
                            className="py-4 px-6"
    
                          >
                            Submit flag
                          </button>
                        </Box>
                        <Box>
                          <button
                            className="py-4 px-6"
                            onClick={() => setShowCTFId(-1)}
                          >
                            Cancel
                          </button>
                        </Box>
                      </div>
                    </Dialog.Panel>
                  </Popup>
                </div>
              </div>
            </Dialog>
          </>
        )}
        <th
          scope="row"
          className="flex items-center px-5 py-6 font-medium text-jaguar whitespace-nowrap dark:text-white"
          style={{
            marginLeft: `${indent}rem`,
            borderLeft: indent ? "1px solid hsl(200, 87%, 26.42%)" : "",
          }}
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
                className="bottom-0 left-8 absolute  w-5 h-5 bg-gray-600 border-2 border-white dark:border-russian-violet rounded-full"
              />
            ) : ctf.matchineType === "linux" ? (
              <VscTerminalLinux
                title="linux"
                className="bottom-0 left-8 absolute  w-5 h-5 bg-gray-600 border-2 border-white dark:border-russian-violet rounded-full"
              />
            ) : (
              <img
                src={ctf.thumbnail}
                title="thumbnail"
                className="bottom-0 left-8 absolute  w-6 bg-green-400 border-2 border-white dark:border-russian-violet rounded-full"
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
        <td className="px-4 py-2 font-medium text-jaguar whitespace-nowrap dark:text-white">
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
        <td className="px-4 py-2 font-medium text-jaguar whitespace-nowrap dark:text-white">
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
        <td className="px-4 py-2 font-medium text-jaguar whitespace-nowrap dark:text-white">
          <div className="flex">
            <svg
              class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-jaguar dark:group-hover:text-white"
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
        <td className="px-4 py-2 font-medium text-jaguar whitespace-nowrap dark:text-white">
          <div className="flex">
            <svg
              class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-jaguar dark:group-hover:text-white"
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
            class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-jaguar dark:group-hover:text-white"
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
      {(ctf.children?.some((child) => child.id === showCTFId) ||
        ctf.id === showCTFId) &&
        ctf.children?.length > 0 &&
        ctf.children?.map((ctf2) => (
          <CTF
            key={ctf2.id}
            ctf={ctf2}
            id={ctf2.id}
            showCTFId={showCTFId}
            setShowCTFId={setShowCTFId}
            indent={indent + 2.5}
          />
        ))}
    </>
  );
};

export default CTF;
