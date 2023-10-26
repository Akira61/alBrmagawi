"use client";
import Navbar from "@/app/(components)/Navbar";
import { apiURLs } from "@/app/url.config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import toast from "react-hot-toast";

export default function Login() {
  const route = useRouter()
  let [email, setEmail] = useState();
  let [password, setPassword] = useState();
  let [error, setError] = useState();

  async function sendData(e) {
    e.preventDefault();
    console.log(email, password);

    const { data } = await axios.post(
      apiURLs.auth.login.post,
      { email: email, password: password },
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
      return route.push("/");
    }
  }
  // login with nextjs route
  async function onLogin(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/auth/login", {
        email,
        password,
      });
      console.log(data);
      if (data.success) {
        // toast.success(data.message)
        route.push("/");
      }
      setError(data.err_message);
    } catch (error) {
      // toast.error(error);
      setError(error);
    }
  }
  return (
    <>
      <Navbar />
      <div
        style={{ backgroundImage: "url(/background-squars.svg)" }}
        className="flex items-center justify-center py-6"
      >
        <div className="w-full max-w-lg p-4 border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 bg-russian-violet/50 dark:border-gray-700">
          <form className="space-y-6" action="#">
            <h5 className="text-3xl py-5 text-center font-medium text-gray-900 dark:text-white">
              Login
            </h5>
            <div className="text-red-500 text-center">{error}</div>
            <div className="relative z-0 w-full mb-6 grou]">
              <input
                type="email"
                name="email"
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
            <div className="relative z-0 w-full mb-6 pb-5 group">
              <input
                type="password"
                name="password"
                id="floating_password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required=""
                onChange={(e) => setPassword(e.target.value)}
              />
              <label
                htmlFor="floating_password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Password
              </label>
            </div>
            <div className="flex items-start">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    defaultValue=""
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                    required=""
                  />
                </div>
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>
              <a
                href="/reset-password"
                className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
              >
                Lost Password?
              </a>
            </div>

            <button
              type="submit"
              onClick={(e) => onLogin(e)}
              className="bg-gradient-to-r w-full hover:bg-gradient-to-l from-sky-500 to-indigo-500 text-white px-4 py-3 rounded-sm hover:bg-slate-700"
            >
              Login
            </button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Don&apos;t have an account?{" "}
              <a
                href="/register"
                className="text-blue-700 hover:underline dark:text-blue-500"
              >
                Register
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
