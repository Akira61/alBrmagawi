"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export function CTF({description, thumbnail, title, show}) {
  let [isOpen, setIsOpen] = useState(show);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-white bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Open dialog
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                      <span className="text-white">Payment successful</span>
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
                      <span className="sr-only">Close modal</span>
                    </button>
                  </Dialog.Title>
                  <div className="mt-2">
                    <form>
                      <dl>
                        <h1 className="mb-2 pt-10 font-semibold leading-none text-gray-900 dark:text-white">
                          Description
                        </h1>
                        <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
                          Lorem ipsum dolor sit, amet consectetur adipisicing
                          elit. Dignissimos neque rem itaque harum, perspiciatis
                          ea quia voluptatem dolorum rerum pariatur,
                          consequatur, aspernatur quis distinctio quo? Dolorem
                          aut, neque non ex libero optio rerum delectus hic
                          expedita illum, deserunt eos. Neque aut enim
                          praesentium odio saepe! Porro facere voluptas, nemo
                          enim, aspernatur ratione mollitia magnam libero magni,
                          quia alias beatae id itaque sunt hic vel? Error animi
                          ipsam delectus molestias, voluptatem, culpa ut
                          temporibus consequuntur deserunt excepturi voluptates
                          earum laborum obcaecati quod et explicabo quae tempora
                          distinctio! Quia quaerat perspiciatis, sed itaque
                          excepturi eos repellat saepe, tempore earum ipsam
                          aliquam! Quaerat laudantium natus officia voluptatum,
                          possimus consequatur obcaecati id reiciendis vero in
                          exercitationem. Quis, explicabo perferendis? Odio
                          ipsam consequatur iure numquam suscipit exercitationem
                          illum quisquam sapiente veniam quasi saepe beatae
                          delectus commodi nam, nulla minus modi eos. Dolore,
                          officiis quo, quibusdam autem nesciunt reiciendis
                          maiores, deleniti perferendis aperiam cum eum
                          reprehenderit.
                        </dd>
                        <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                          Category
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
                      onClick={closeModal}
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
  );
}
