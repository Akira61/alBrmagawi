"use client";
import Accordion from "@/app/(components)/Accordion";
import AddSection from "@/app/(components)/courses/sections/AddSection";
import Head from "next/head";
import { useEffect, useState } from "react";
import { AiOutlineFolderAdd } from "react-icons/ai";
import { HiOutlineVideoCamera } from "react-icons/hi";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

export default function CourseSections({ params }) {
  const { courseId } = params;
  const [open, setOpen] = useState(false);
  const [toggleNewSection, setToggleNewSection] = useState(false);
  const [courseData, setCourseData] = useState([]);
  const [newSection, setNewSection] = useState();
  const [data, setData] = useState([]);
  //   let sectionsData = [
  //     {
  //       title: "interduction",
  //       sections:
  //         "lfjdljddjlfdskjfldskfjdslfjdsldsfjdslfjdslfjdslfdjslkfdsjfldsjflkdsjflkdsjflkdsjflkdsjf;lkdsfldsjflkdsjflkdsjfldsjfldsjfd;lsifj;sld",
  //     },
  //     {
  //       title: "interduction",
  //       sections:
  //         "lfjdljddjlfdskjfldskfjdslfjdsldsfjdslfjdslfjdslfdjslkfdsjfldsjflkdsjflkdsjflkdsjflkdsjf;lkdsfldsjflkdsjflkdsjfldsjfldsjfd;lsifj;sld",
  //     },
  //     {
  //       title: "interduction",
  //       sections:
  //         "lfjdljddjlfdskjfldskfjdslfjdsldsfjdslfjdslfjdslfdjslkfdsjfldsjflkdsjflkdsjflkdsjflkdsjf;lkdsfldsjflkdsjflkdsjfldsjfldsjfd;lsifj;sld",
  //     },
  //   ];

  useEffect(()=>{
    //get course data
    getCourse()
    async function getCourse(){
      try {
        const { data } = await axios.get(
          `/api/courses/${courseId}/getCourseDetails`
        );
        console.log(data);
        if (data.err_message) {
          return toast.error(data.err_message);
        }
        if (data.success) {
          console.log(data.course)
          setCourseData(data.course)
        }
      } catch (error) {
        return toast.error(error.message);
      }

    }
  },[])

  useEffect(() => {
    getSections();
  }, []);
  //get sections
  async function getSections() {
    try {
      const { data } = await axios.get(`/api/courses/${courseId}/sections/`);
      console.log(data);
      if (data.err_message) {
        return toast.error(data.err_message);
      }
      let sections = [];
      data.sections.map((section) => {
        console.log(section.section);
        let lessons = [];
        data.lessons.map((lesson) => {
          //check if current lesson belong to current section
          if (lesson.section == section.id) {
            lessons.push(lesson);
          }
        });
        sections.push({
          title: section.section,
          sectionId: section.id,
          lessons: lessons,
        });
        // sectionsData.push({
        //   title: element.section,
        //   sections: "none",
        // });
      });
      setData(sections);
      console.log("data: ", sections);
    } catch (error) {
      return console.log("error: ", error.message);
    }
  }

  // toggle open close folder
  function toggle(indexOfItem) {
    if (open === indexOfItem) {
      return setOpen(null);
    }
    setOpen(indexOfItem);
  }

  // save new section
  async function saveNewSection() {
    try {
      if (newSection) {
        console.log(courseId);
        const { data } = await axios.post(
          `/api/courses/${courseId}/sections/newSection`,
          {
            sectionName: newSection,
            courseId: courseId,
          }
        );
        console.log(data);
        if (data.err_message) {
          return toast.error(data.err_message);
        }
        if (data.success) {
          toast.success(data.message);
          window.location.reload();
        }
      }
    } catch (error) {
      console.log("error: ", error.message);
    }
  }
  return (
    <>
      <Toaster />
      <section className="h-screen pt-3">
        <div className="px-[40px]">
          {/* course settings */}
          <>
            <section className="bg-white dark:bg-gray-900">
              <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
                <div className=" gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    <img
                      className="mx-auto mb-4 w-36 h-36 rounded-full"
                      src={ `/courses/thumbnails/${courseData.thumbnail}`}
                      alt="Bonnie Avatar"
                    />

                    <Link href={`/courses/createCourse/${courseId}/courseSettings`}>
                      <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-md w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Course settings
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </>
          {data.map((data, index) => {
            console.log("loop: ", data);
            return (
              <Accordion
                key={index}
                open={index === open}
                title={data.title}
                section={data.lessons}
                sectionId={data.sectionId}
                courseId={courseId}
                toggle={() => toggle(index)}
              />
            );
          })}
          {/* new section form */}
          {toggleNewSection ? (
            <div className="mt-3">
              <div className="flex p-1 dark:bg-gray-700 hover:dark:bg-gray-700">
                <div className="flex justify-between gap-2 p-5 font-semibold text-left text-gray-900 dark:text-white">
                  <div className="relative z-0 w-full group">
                    <input
                      type="text"
                      name="floating_email"
                      id="floating_email"
                      className="block py-2.5 px-0 w-full md:w-96 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                      onChange={(e) => setNewSection(e.target.value)}
                    />
                    <label
                      htmlFor="floating_email"
                      className="peer-focus:font-medium absolute text-sm text-gray-300 dark:text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Section Name
                    </label>
                  </div>
                  <div className="flex justify-between gap-2">
                    <button
                      className="bg-blue-600 p-2 rounded-md hover:dark:bg-blue-800"
                      onClick={() => saveNewSection()}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-500 p-2 transition rounded-md hover:dark:bg-gray-800"
                      onClick={() => setToggleNewSection(false)}
                    >
                      cancel
                    </button>
                  </div>
                  {/* <p className="text-xl text-center text-gray-400 dark:text-gray-200">
                  New Section
                </p> */}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          <div
            onClick={() => setToggleNewSection(true)}
            className="mt-3 border-2 border-gray-400 border-dashed cursor-pointer"
          >
            <div className="flex items-center justify-center dark:bg-gray-600 hover:dark:bg-gray-700">
              <div className="flex justify-between gap-2 p-5 font-semibold text-left text-gray-900 dark:text-white">
                <AiOutlineFolderAdd className="text-2xl" />
                <p className="text-xl text-center text-gray-400 dark:text-gray-200">
                  New Section
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
