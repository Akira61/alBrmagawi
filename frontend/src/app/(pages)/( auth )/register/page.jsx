import Navbar from "@/app/(components)/Navbar";
import RegisterPanel from "@/app/(components)/auth/registerPanel";
import RegisterStudentForm from "@/app/(components)/auth/registerStudentForm";
import RegisterTeacherForm from "@/app/(components)/auth/registerTeacherForm";

export default function Register({ searchParams }) {
  //console.log(searchParams)
  const registerType = searchParams.type;
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
