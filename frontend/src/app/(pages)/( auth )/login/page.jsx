"use client";
import Navbar from "@/app/(components)/Navbar";
import Arwes from "@/app/(components)/Arwes";
import { apiURLs } from "@/app/url.config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Kranox from "@/app/(components)/ctf/Kranox";
import Box from "@/app/(components)/ctf/Box";
import Background from "@/app/(components)/ctf/Background";

export default function Login() {
  const route = useRouter();
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
      },
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
      setError(error.message);
    }
  }

  return (
    <Arwes>
      <Background />
      <Navbar />
      <Kranox className="max-w-lg mx-auto mt-8">
        <div className="p-4 shadow sm:p-6 md:p-8 z-50">
          <form className="space-y-6" action="#">
            <h5 className="text-3xl py-5 text-center font-medium text-gray-900 dark:text-white">
              Login
            </h5>
            <div className="text-red-500 text-center">{error}</div>
            <Box>
              <input
                type="email"
                name="email"
                id="floating_email"
                className="block p-4 bg-transparent w-full focus:outline-none"
                placeholder="Email address"
                required=""
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="floating_email" hidden>
                Email address
              </label>
            </Box>
            <Box>
              <input
                type="password"
                name="password"
                id="floating_password"
                className="block p-4 bg-transparent w-full focus:outline-none"
                placeholder="Password"
                required=""
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="floating_password" hidden>
                Password
              </label>
            </Box>
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

            <Box>
              <button
                type="submit"
                onClick={(e) => onLogin(e)}
                className="p-4 w-full text-center cursor-pointer"
              >
                Login
              </button>
            </Box>
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
      </Kranox>
    </Arwes>
  );
}
