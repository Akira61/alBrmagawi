"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function CreateTeam() {
  const route = useRouter();
  const [error, setError] = useState();
  const [teamName, setTeamName] = useState("");
  const [teamPassword, setTeamPassword] = useState("");
  // validate password
  async function onSubmit(e) {
    e.preventDefault();
    //reset errors if any
    setError("");
    try {
      // send api request to check if password correct
      const { data } = await axios.post(`/api/teams/createTeam`, {
        teamName: teamName,
        password: teamPassword,
      });
      console.log(data);
      if (data.err_message) {
        toast.error(data.err_message);
        setError(data.err_message);
        return;
      }
      if (data.success) {
        toast.success(data.message);
        return route.push("/");
      }
    } catch (error) {
      console.log("`app/joinTeam` error: ", error.message);
    }
  }
  return (
    <div>
      <Toaster />
      <div
        style={{ backgroundImage: "url(/background-squars.svg)" }}
        className="flex items-center justify-center py-48"
      >
        <div className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" action="#">
            <h5 className="text-3xl py-5 text-center font-medium text-gray-900 dark:text-white">
              Create A Team
            </h5>
            <div className="text-red-500 text-center">{error}</div>

            <div className="relative z-0 w-full mb-6 grou]">
              <input
                type="text"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required=""
                onChange={(e) => setTeamName(e.target.value)}
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Team Name
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 grou]">
              <input
                type="password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required=""
                onChange={(e) => setTeamPassword(e.target.value)}
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Team Password
              </label>
            </div>

            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={(e) => onSubmit(e)}
            >
              Create Team
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
