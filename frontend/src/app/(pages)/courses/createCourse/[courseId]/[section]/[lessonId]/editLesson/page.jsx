"use client";
import { Switch } from "@headlessui/react";
import axios from "axios";
import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import toast, { Toaster } from "react-hot-toast";

export default function EditLesson({ params }) {
  const { courseId,lessonId, section } = params;

  const [enabled, setEnabled] = useState(false);
  const [saveBtn, setSaveBtn] = useState("Save");
  const [preview, setPreview] = useState([]);
  const [file, setFile] = useState();
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
    //get data
    useEffect(async ()=>{
        try {
           const {data} = await axios.get(`/api/courses/${courseId}/${lessonId}/getLesson`);
           if(data.err_message){
            return toast.error(data.err_message)
           } 
           if(data.success){
            setPreview([{preview: `/courses/lessons/${data.lessons[0].content}`}]);
            setTitle(data.lessons[0].title);
            setDesc(data.lessons[0].description)
            setEnabled(parseInt(data.lessons[0].public)== 1?true: false);
           }
        } catch (error) {
            return toast.error(error.message)
        }
    },[])
  // dropzone
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log(acceptedFiles);
    setFile(acceptedFiles[0]);
    // show files
    if (acceptedFiles?.length) {
      setPreview([]); // empty the preview on file change
      setPreview((previewFile) => [
        ...previewFile,
        ...acceptedFiles.map((File) =>
          Object.assign(File, { preview: URL.createObjectURL(File) })
        ),
      ]);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  async function onSave(e) {
    e.preventDefault();
    setSaveBtn("Loading...");
    try {
      const fd = new FormData();
      fd.set("title", title);
      fd.set("file", file);
      fd.set("desc", desc);
      fd.set("viewable", enabled);
      fd.set("section", section);
      fd.set("courseId", courseId);
      fd.set("lessonId", lessonId);
      const { data } = await axios.post(
        `/api/courses/${courseId}/${lessonId}/editLesson`,
        fd,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data.err_message) {
        setSaveBtn("save");
        return toast.error(data.err_message);
      }
      if (data.success) {
        setSaveBtn("save");
        window.location.replace(`/courses/createCourse/${courseId}/sections`)
        return toast.success(data.message);
      }
    } catch (error) {
      setSaveBtn("save");
      console.log(error.message);
      return toast.error(error.message);
    }
  }
  return (
    <div className="p-14">
      <Toaster />
      <div className="relative py-16 pb-11 overflow-x-auto shadow-md ">
        <div className="flex items-center justify-between bg-white dark:text-white dark:bg-gray-800">
          <div className="p-5 text-2xl font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            Update Lesson
            {/* <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                  teachers details. you can edit or remove teacher
                </p> */}
          </div>
        </div>
      </div>{" "}
      <form>
        <div className="relative z-0 w-full mb-6 group">
          {/* <>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
              )}
            </div>
          </> */}
          <div
            htmlFor="floating_email"
            className="text-sm py-3 text-gray-500 dark:text-gray-400 duration-300 transform "
          >
            Course Video <span className="text-red-500">*</span>
          </div>
          <div className="flex items-center justify-center w-full">
            <div
              {...getRootProps({
                className:
                  "flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600",
              })}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <input {...getInputProps()} />

                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      onely mp4 files
                    </p>
                  </>
                )}
              </div>
              {/* <input
                id="dropzone-file"
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                className="hidden"
              /> */}
            </div>
          </div>
        </div>
        {/* preview video */}
        {preview.length>0 ? (
          <div className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <ul>
              {preview.map((video) => (
                <li>
                  <p className="text-center py-4 text-gray-500 dark:text-gray-400">
                    {video.name}
                  </p>
                  <video controls width={"100%"} src={video.preview}></video>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          ""
        )}
        <div className="flex items-center justify-center w-full py-2">
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Title <span className="text-red-500">*</span>
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="floating_email"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required=""
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Title <span className="text-red-500">*</span>
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <textarea
            name=""
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required=""
            cols="30"
            rows="10"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Description <span className="text-xs text-gray-500">Optional</span>
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <Switch
            checked={enabled}
            onChange={() => setEnabled(!enabled)}
            id="switch"
            className={`${
              enabled ? "bg-blue-600" : "bg-gray-200"
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only text-white">Enable notifications</span>
            <span
              className={`${
                enabled ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
          <label htmlFor="switch" className="px-2 text-gray-400">
            Viewable Lesson
          </label>
        </div>
        <button
          type="submit"
          onClick={(e) => onSave(e)}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {saveBtn}
        </button>
      </form>
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <script src="//static.filestackapi.com/filestack-js/3.x.x/filestack.min.js"></script>
    </div>
  );
}
