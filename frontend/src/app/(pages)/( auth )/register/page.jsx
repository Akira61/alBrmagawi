"use client";
import Navbar from "@/app/(components)/Navbar";
import RegisterPanel from "@/app/(components)/auth/registerPanel";
import RegisterStudentForm from "@/app/(components)/auth/registerStudentForm";
import RegisterTeacherForm from "@/app/(components)/auth/registerTeacherForm";
import Kranox from "@/app/(components)/ctf/Kranox";
import Background from "@/app/(components)/ctf/Background";
import Arwes from "@/app/(components)/Arwes";

export default function Register({ searchParams }) {
  const registerType = searchParams.type;

  return (
    <Arwes>
      <div className="registration">
        <Background />
        <Navbar />
        {/* register option panel */}
        <Kranox
          className="max-w-lg mx-auto mt-8 text-center"
        >
          {registerType === "student" ? (
            <RegisterStudentForm />
          ) : registerType === "teacher" ? (
            <RegisterTeacherForm />
          ) : (
            <RegisterPanel type={searchParams} />
          )}
        </Kranox>
      </div>
    </Arwes>
  );
}
