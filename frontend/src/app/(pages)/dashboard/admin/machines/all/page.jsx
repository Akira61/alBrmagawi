"use client";
import SideNavbar from "@/app/(components)/SideNavbar";
import {
  faAngleRight,
  faPenToSquare,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AllMachine() {
  const [data, setData] = useState([]);
  const [error, setError] = useState([]);
  const colomns = [
    "THUMBNAIL",
    "TITLE",
    "POINTS",
    "LEVEL",
    "MACHINE TYPE",
    "USERS OWNS",
    "USER FLAG",
    "ROOT FLAG",
    "TEAM",
    "LINKS",
    "FIRST BLOOD",
    "DESCRIPTION",
    "JOINING DATE",
    "ACTION",
  ];
  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    try {
      const { data } = await axios.get("/api/machines/all");
      if (data.success) {
        setData(data.data);
      }
      if (!data.success) {
        setError(data.err_message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //delete teacher
  async function deleteMember(userId) {
    try {
      const { data } = await axios.get(
        `/api/dashboards/admin/staff/delete/${userId}`
      );
      if (data.success) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="flex">
        <SideNavbar />
        <div className="sidebar-settings h-screen py-28 flex-1 p-7">
          <>
            <div className="relative pb-11 shadow-md ">
              <div className="flex items-center justify-between bg-white dark:text-white dark:bg-gray-800">
                <div class="p-5 text-2xl font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                  All staff members
                  {/* <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                  teachers details. you can edit or remove teacher
                </p> */}
                </div>
                <div className="p-5 font-medium text-gray-400">
                  <Link href="/dashboard" className="hover:underline">
                    Dashboard
                  </Link>{" "}
                  <FontAwesomeIcon className="mx-1" icon={faAngleRight} />{" "}
                  <Link href="/dashboard" className="hover:underline">
                    staff
                  </Link>{" "}
                  <FontAwesomeIcon className="mx-1" icon={faAngleRight} />{" "}
                  <Link
                    href="/dashboard/admin/staff/all"
                    className="text-gray-200 dark:white hover:underline"
                  >
                    All staff
                  </Link>
                </div>
              </div>
            </div>
            <div class="flex items-center pb-4">
              <div className="relative">
                <Link href={`/dashboard/admin/machines/createMachine`}>
                  <button
                    className="block bg-cyan-400 text-gray-800 p-2 rounded-sm"
                    type="button"
                  >
                    {" "}
                    <FontAwesomeIcon
                      className="mx-1 text-gray-800"
                      icon={faPlus}
                    />{" "}
                    Add Machine
                  </button>
                </Link>
              </div>
            </div>
            <div className="relative  shadow-lmd sm:rounded-sm">
              <table className="w-full mb-14 text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    {colomns.map((colomn, i) => (
                      <th scope="col" className="px-6 py-3" key={i}>
                        <div className="flex items-center">
                          {colomn}
                          <a href="#">
                            <svg
                              className="w-3 h-3 ml-1.5"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                            </svg>
                          </a>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((machine, i) => (
                    <tr key={i} className="bg-white border-b font-semibold dark:bg-gray-800 dark:border-gray-700 ">
                      <td className="px-6 py-4">
                        <img
                          src={`/machines/${machine.thumbnail}`}
                          alt=""
                          className="w-10 h-10 text-right rounded-full"
                        />
                      </td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {" "}
                        {machine.title}
                      </th>
                      <td className="px-6 py-4">{machine.points}</td>
                      <td className="px-6 py-4">{machine.level}</td>
                      <td className="px-6 py-4">{machine.machineType}</td>
                      <td className="px-6 py-4">{machine.userOwns}</td>
                      <td className="px-6 py-4">{machine.user_flag}</td>
                      <td className="px-6 py-4">{machine.root_flag}</td>
                      <td className="px-6 py-4">{machine.team}</td>
                      <td className="px-6 py-4">{machine.first_blood}</td>
                      <td className="px-6 py-4">{machine.description}</td>
                      <td className="px-6 py-4">{machine.joining_date}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-between">
                          <a
                            href={`/dashboard/admin/staff/edit/${machine.id}`}
                            title="Edit"
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            <FontAwesomeIcon
                              className="bg-cyan-400 text-gray-800 text-sm p-2 rounded-md"
                              icon={faPenToSquare}
                            />{" "}
                          </a>
                          <a
                            onClick={() => deleteMember(machine.id)}
                            href={`#`}
                            title="Delete"
                            className="font-medium mx-4 text-red-600 dark:text-red-500 hover:underline"
                          >
                            <FontAwesomeIcon
                              className="bg-red-500 text-gray-800 text-sm p-2 rounded-md"
                              icon={faTrashCan}
                            />{" "}
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        </div>
      </div>
    </>
  );
}