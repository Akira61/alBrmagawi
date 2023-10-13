"use client";
import Head from "next/head";
import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
// import { initFlowbite } from "flowbite";
// import { Dropdown } from "flowbite-react";
import { useEffect } from "react";
import { Collapse } from "react-collapse";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlinePlusSquare,
} from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import Dropdown from "./Dropdown";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Link from "next/link";

export default function Accordion({
  open,
  toggle,
  title,
  section,
  sectionId,
  courseId,
}) {
  const [edit, setEdit] = useState(null);
  const [editSectionName, setEditSectionName] = useState();
  async function editSection() {
    try {
      const { data } = await axios.post(
        `/api/courses/${courseId}/editSection`,
        {
          section: editSectionName,
          sectionId: sectionId,
          courseId: courseId,
        }
      );

      if (data.err_message) {
        return toast.error(data.err_message);
      }
      if (data.success) {
        window.location.reload();
        return toast.success(data.message);
      }
    } catch (error) {
      return toast.error(error.message);
    }
  }

  //delete section
  async function deleteSection() {
    try {
      const { data } = await axios.post(
        `/api/courses/${courseId}/deleteSection`,
        {
          sectionId: sectionId,
          courseId: courseId,
        }
      );

      if (data.err_message) {
        return toast.error(data.err_message);
      }
      if (data.success) {
        window.location.reload();
        return toast.success(data.message);
      }
    } catch (error) {
      return toast.error(error.message);
    }
  }

  //delete lesson
  async function deleteLesson(lesson){
    try {
      const {data} = await axios.delete(`/api/courses/${courseId}/${lesson.id}/deleteLesson`);
      if(data.success){
        window.location.reload();
        return toast.success(data.message);
      }
      if(data.err_message){
        return toast.error(data.err_message);
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <>
      <Toaster />
      <Head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.css"
          rel="stylesheet"
        />
      </Head>
      <div className="pt-[10px]">
        <div className="bg-gray-700 py-[25px] px-[50px] flex justify-between items-center">
          {/* title */}
          <p
            onClick={toggle}
            className="text-[22px] font-semibold cursor-pointer hover:underline"
          >
            {edit ? (
              <>
                <div className="mt-3">
                  <div className="flex dark:bg-gray-700 hover:dark:bg-gray-700">
                    <div className="flex justify-between gap-2 font-semibold text-left text-gray-900 dark:text-white">
                      <div className="relative z-0 w-full group">
                        <input
                          type="text"
                          name="floating_email"
                          id="floating_email"
                          defaultValue={edit}
                          className="block py-2.5 px-0 w-full md:w-96 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required
                          onChange={(e) => setEditSectionName(e.target.value)}
                        />
                        <label
                          htmlFor="floating_email"
                          className="peer-focus:font-medium absolute text-sm text-gray-300 dark:text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Section Name
                        </label>
                      </div>
                      <div className="flex justify-between gap-2">
                        <button
                          className="bg-blue-600 p-2 rounded-md hover:dark:bg-blue-800"
                          onClick={() => editSection()}
                        >
                          Save
                        </button>
                        <button
                          className="bg-gray-500 p-2 transition rounded-md hover:dark:bg-gray-800"
                          onClick={() => setEdit(false)}
                        >
                          cancel
                        </button>
                      </div>
                      {/* <p className="text-xl text-center text-gray-400 dark:text-gray-200">
                  New Section
                </p> */}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              title
            )}
          </p>
          {/* icons beside title */}
          <div className="text-[30px] flex justify-between gap-4">
            {/* <Dropdown inline arrowIcon={false} label={<CiEdit title="Edit" />}>
              <Dropdown.Header>
                <span className="block text-sm">Bonnie Green</span>
                <span className="block truncate text-sm font-medium">
                  bonnie@flowbite.com
                </span>
              </Dropdown.Header>
              <Dropdown.Item  icon={<CiEdit />}>Edit Title</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
            </Dropdown> */}

            {/* <CiEdit title="Edit" className="cursor-pointer" /> */}

            <div>
              <div>
                <Menu>
                  <Menu.Button>
                    <CiEdit title="Edit" className="cursor-pointer" />
                  </Menu.Button>
                  <Menu.Items
                    className={`focus:outline-none absolute origin-top-left w-fit divide-y p-4 text-black divide-gray-100 rounded-md bg-white shadow-lg`}
                  >
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            className={`${active && "text-gray-500"} w-full`}
                            href={"#"}
                            onClick={() => setEdit(title)}
                          >
                            Edit
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            className={`${active && "text-gray-500"} w-full`}
                            href={"#"}
                            onClick={() => deleteSection()}
                          >
                            Delete
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Menu>
              </div>

              {/* <Dropdown
                title={<CiEdit title="Edit" className="cursor-pointer" />}
                items={[
                  { title: "Edit", link: sectionId },
                  { title: "Delete", link: sectionId },
                ]}
              /> */}
            </div>

            {open ? (
              <AiOutlineMinus onClick={toggle} className="cursor-pointer" />
            ) : (
              <AiOutlinePlus onClick={toggle} className="cursor-pointer" />
            )}
          </div>
        </div>
        {/* content */}
        <Collapse isOpened={open}>
          <div className="bg-gray-800 px-[50px] pb-[20px]">
            <div className="controls pt-7 py-2">
              <a
                href={`/courses/createCourse/${courseId}/${title}/newLesson`}
                className="flex font-semibold hover:underline hover:text-gray-300"
              >
                <AiOutlinePlusSquare className="mx-1 text-2xl cursor-pointer text-white" />
                New lesson
              </a>
            </div>

            <ol type="1">
              {section.map((element, index) => (
                <li className="pt-3 flex justify-between " key={index}>
                  <div className="flex">
                    <HiOutlineVideoCamera />
                    <a
                      className="px-2 cursor-pointer hover:text-gray-500"
                      href={element.src}
                      key={index}
                    >
                      {element.title}
                    </a>
                  </div>
                  <div className="flex gap-2">
                  <Link
                    href={`/courses/createCourse/${courseId}/${title}/${element.id}/editLesson`}
                  >
                    <BiEdit
                      title="Edit"
                      className="cursor-pointer text-xl hover:text-gray-500"
                    />
                  </Link>
                  <Link
                    href={`#`}
                    onClick={()=> deleteLesson(element)}
                  >
                    <RiDeleteBinLine
                      title="Delete"
                      className="cursor-pointer text-xl hover:text-gray-500"
                    />
                  </Link>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          {/* eslint-disable-next-line @next/next/no-sync-scripts */}
          <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.js"></script>
        </Collapse>
      </div>
    </>
  );
}
