"use client";

import Navbar from "@/app/(components)/Navbar";
import { apiURLs } from "@/app/url.config";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

export default function ResetPassword() {
  let [email, setEmail] = useState();
  let [error, setError] =  useState();
  async function sendData(e) {
    e.preventDefault();
    console.log(email);

    const { data } = await axios.post(
      apiURLs.auth.resetPassword.post,
      { email: email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data);
    // handdel error
    if (!data.success) {
      setError(data.err_message);
    }
    if (data.success) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "success",
        title: "Ckeck your Email inbox",
      });

      location.href = "/";
    }
  }

  return (
    <>
      <Navbar />
      <div
        style={{ backgroundImage: "url(/background-squars.svg)" }}
        className="flex items-center justify-center py-6"
      >
        <div className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" action="#">
            <h5 className="text-3xl py-5 text-center font-medium text-gray-900 dark:text-white">
              Reset password
            </h5>
            <div className="text-red-500 text-center">{error}</div>
            <div className="relative z-0 w-full mb-6 grou]">
              <input
                type="email"
                name="floating_email"
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required=""
                onChange={(e) => setEmail(e.target.value)}
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email address
              </label>
            </div>

            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={(e) => sendData(e)}
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
