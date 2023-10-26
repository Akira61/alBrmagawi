"use client";
import { apiURLs } from "@/app/url.config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Box from "@/app/(components)/ctf/Box";

export default function RegisterStudentForm() {
  const route = useRouter();
  let [firstName, setFirstName] = useState();
  let [lastName, setLastName] = useState();
  let [email, setEmail] = useState();
  let [password, setPassword] = useState();
  let [confirmPassword, setConfirmPassword] = useState();
  let [error, setError] = useState();

  async function sendData(e) {
    e.preventDefault();
    console.log(password, confirmPassword);
    if (password !== confirmPassword) return setError("passwords dosn't match");
    const { data } = await axios.post(
      apiURLs.auth.register.student.post,
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      },
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
      location.href = "/";
    }
  }
  // signup with nextjs route
  async function onSignup(e) {
    e.preventDefault();
    if (password !== confirmPassword) return setError("passwords dosn't match");
    try {
      const { data } = await axios.post("/api/auth/signup/user", {
        firstName,
        lastName,
        email,
        password,
      });
      console.log(data);
      if (data.success) {
        route.push("/login");
      }
      setError(data.err_message);
    } catch (error) {
      toast.error(error);
      setError(error.message);
    }
  }
  return (
    <>
      <div className="max-w-lg px-8 py-8">
        <form className="space-y-6" action="#">
          <h5 className="text-3xl py-5 text-center font-medium text-gray-900 dark:text-white">
            Student registeration
          </h5>
          <div className="text-red-500 text-center">{error}</div>
          <div className="grid md:gap-6">
            <Box>
              <input
                type="text"
                name="firstName"
                id="floating_first_name"
                className="block p-4 bg-transparent w-full focus:outline-none"
                placeholder="First name"
                required=""
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label htmlFor="floating_first_name" hidden>
                First name
              </label>
            </Box>
            <Box>
              <input
                type="text"
                name="lastName"
                id="floating_last_name"
                className="block p-4 bg-transparent w-full focus:outline-none"
                placeholder="Last name"
                required=""
                onChange={(e) => setLastName(e.target.value)}
              />
              <label htmlFor="floating_last_name" hidden>
                Last name
              </label>
            </Box>
            <Box>
              <input
                type="email"
                name="]email"
                id="floating_email"
                placeholder="Email address"
                className="block p-4 bg-transparent w-full focus:outline-none"
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
                placeholder="Password"
                className="block p-4 bg-transparent w-full focus:outline-none"
                required=""
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="floating_password" hidden>
                Password
              </label>
            </Box>
            <Box>
              <input
                type="password"
                name="repeat_password"
                id="floating_repeat_password"
                placeholder="Confirm password"
                className="block p-4 bg-transparent w-full focus:outline-none"
                required=""
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label htmlFor="floating_repeat_password" hidden>
                Confirm password
              </label>
            </Box>
            <Box>
              <button
                type="submit"
                className="w-full text-center p-4"
                onClick={(e) => onSignup(e)}
              >
                Register
              </button>
            </Box>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-700 hover:underline dark:text-blue-500"
              >
                Login
              </a>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
