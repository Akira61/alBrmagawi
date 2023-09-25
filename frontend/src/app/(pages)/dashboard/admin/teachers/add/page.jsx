import SideNavbar from "@/app/(components)/SideNavbar";
import RegisterTeacherForm from "@/app/(components)/auth/registerTeacherForm";

export default function AddTeacher() {
  return (
    <>
      <div className="flex">
        <SideNavbar />
        <div className="sidebar-settings h-screen py-28 flex-1 p-7 h-[200vh]">
          <div className="items-center flex justify-center">
            <RegisterTeacherForm />
          </div>
        </div>
      </div>
    </>
  );
}
