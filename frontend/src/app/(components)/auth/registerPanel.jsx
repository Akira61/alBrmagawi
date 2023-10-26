import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RegisterStudentForm from "./registerStudentForm";
import RegisterTeacherForm from "./registerTeacherForm";

export default function RegisterPanel({ type }) {
  console.log(type.type);
  const registerType = type.type;
  //if(type === 'student')
  return (
    <>
      <div className="wrapper w-[58%] p-4 text-center border border-gray-200 rounded-lg shadow sm:p-8 bg-jaguar dark:border-gray-700">
        <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          Join As
        </h5>
        <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
          Choose registeration option
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 justify-center gap-[6vw] space-y-4 sm:flex sm:space-y-0 sm:space-x-4 py-10">
          <a
            href="/register?type=student"
            className="w-full sm:w-auto hover:bg-russian-violet bg-russian-violet/60 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5"
          >
            <div>
              {/* <FontAwesomeIcon icon={faGraduationCap} className="md:h-44 sm:h-auto max-w-full rounded-lg" /> */}
              <img
                src="/student.svg"
                alt=""
                className="md:h-32 sm:h-auto max-w-full rounded-lg"
              />
              <p className="md:mt-8 text-base text-gray-500 sm:text-lg dark:text-gray-400">
                Student
              </p>
            </div>
          </a>
          {/* <a
            href="/register?type=teacher"
            className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
          >
            <div>
              <img
                className="md:h-44 sm:h-auto max-w-full rounded-lg"
                src="/teacher.svg"
                alt=""
              />
              <p className="mb-5 mt-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
                Teacher
              </p>
            </div>
          </a> */}
        </div>
      </div>
    </>
  );
}
