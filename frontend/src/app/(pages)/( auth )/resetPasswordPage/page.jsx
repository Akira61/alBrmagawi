"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ResetPasswordPage() {
  let [password, setPssword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let [token, setToken] = useState("");
  let [success, setSuccess] = useState(false);
  let [error, setError] = useState(false);

  // grap token from url
  useEffect(() => {
    seTokken();
  }, []);
  
  function seTokken(){
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }
  async function reset() {
    try {
      if (token.length > 0) {
        const {data} = await axios.post("/api/auth/resetPassword", {
          token,
          password,
          confirmPassword,
        });
        console.log(data);
        if (data.success) {
          return setSuccess("you reset your password successfully");
        }
        if(data.err_message){
            return setError(data.err_message)
        }
      }
    } catch (error) {
       throw new Error(error.message)
    }
  }
  return (
    <>
      <div
        style={{ backgroundImage: "url(/background-squars.svg)" }}
        className="flex items-center justify-center py-6"
      >
        <div className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" action="#" method="post">
            <h5 className="text-3xl py-5 text-center font-medium text-gray-900 dark:text-white">
              Reset password
            </h5>

            <div className="text-red-500 text-center">{error}</div>
            <div className="text-green-500 text-center">
              {success}
            </div>
            <div className="relative z-0 w-full mb-6 grou]">
              <input
                type="text"
                name="floating_email"
                id="floating_password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required=""
                onChange={(e) => setPssword(e.target.value)}
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                new Password
              </label>
            </div>

            <div className="relative z-0 w-full mb-6 grou]">
              <input
                type="text"
                name="floating_email"
                id="floating_password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required=""
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                confirm Password
              </label>
            </div>

            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={(e) => reset()}
            >
              Reset password
            </button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-700 hover:underline dark:text-blue-500"
              >
                Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
