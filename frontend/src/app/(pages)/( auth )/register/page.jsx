"use client";
import Navbar from "@/app/(components)/Navbar";
import RegisterPanel from "@/app/(components)/auth/registerPanel";
import RegisterStudentForm from "@/app/(components)/auth/registerStudentForm";
import RegisterTeacherForm from "@/app/(components)/auth/registerTeacherForm";
import { apiURLs } from "@/app/url.config";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Register({ searchParams }) {
  //console.log(searchParams)
  const registerType = searchParams.type;

  // let [firstName, setFirstName] = useState();
  // let [lastName, setLastName] = useState();
  // let [email, setEmail] = useState();
  // let [password, setPassword] = useState();
  // let [confirmPassword, setConfirmPassword] = useState();
  // let [error, setError] = useState();
  // async function sendData(e) {
  //   e.preventDefault();
  //   if (password !== confirmPassword) setError("passwords dosn't match");
  //   const { data } = await axios.post(
  //     apiURLs.auth.register.student.post,
  //     {
  //       firstName: firstName,
  //       lastName: lastName,
  //       email: email,
  //       password: password,
  //     },
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   console.log(data);
  // }
  

  return (
    <>
      <div className="registration">
        <Navbar />
        {/* register option panel */}
        <div
          style={{ backgroundImage: "url(/background-squars.svg)" }}
          className="flex items-center justify-center py-6"
        >
          {registerType === "student" ? (
            <RegisterStudentForm />
          ) : registerType === "teacher" ? (
            <RegisterTeacherForm />
          ) : (
            <RegisterPanel type={searchParams} />
          )}
        </div>
      </div>
    </>
  );
}
