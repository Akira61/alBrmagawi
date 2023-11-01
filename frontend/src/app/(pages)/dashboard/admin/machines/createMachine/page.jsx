"use client";
import SideNavbar from "@/app/(components)/SideNavbar";
import { Switch } from "@headlessui/react";
import axios from "axios";
import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import toast, { Toaster } from "react-hot-toast";

export default function CreateMachine({ params }) {
  const { courseId, section } = params;

  const [saveBtn, setSaveBtn] = useState("Save");
  const [preview, setPreview] = useState([]);
  let [links, setLinks] = useState([{ title: "", link: "" }]);
  const [file, setFile] = useState();
  const [title, setTitle] = useState();
  const [points, setPoints] = useState();
  const [level, setLevel] = useState();
  const [machineType, setMachineType] = useState();
  const [userFlag, setUserFlag] = useState();
  const [rootFlag, setRootFlag] = useState();
  const [desc, setDesc] = useState();

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
  //end dropzone

  //on save
  async function onSave(e) {
    e.preventDefault();
    setSaveBtn("Loading...");

    try {
      const fd = new FormData();
      fd.set("title", title);
      fd.set("file", file);
      fd.set("points", points);
      fd.set("level", level);
      fd.set("machineType", machineType);
      fd.set("userFlag", userFlag);
      fd.set("rootFlag", rootFlag);
      fd.set("links", JSON.stringify(links));
      fd.set("desc", desc);
      console.log(links);
      //   fd.set("courseId", courseId);
      const { data } = await axios.post(`/api/machines/create`, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (data.err_message) {
        setSaveBtn("save");
        return toast.error(data.err_message);
      }
      if (data.success) {
        setSaveBtn("save");
        window.location.replace(`/dashboard/admin/machines/all`);
        return toast.success(data.message);
      }
    } catch (error) {
      setSaveBtn("save");
      console.log(error.message);
      return toast.error(error.message);
    }
  }
  //end on save

  async function handelAddedLinks(e, i) {
    const values = [...links];
    values[i][e.target.name] = e.target.value;
    setLinks(values);
  }
  async function addLinkInput(e) {
    e.preventDefault();
    setLinks([...links, { title: "", link: "" }]);
  }
  async function removeLinkInput(e, index) {
    e.preventDefault();
    const values = [...links];
    values.splice(index, 1);
    setLinks(values);
  }
  return (
    <div className="p-14">
      <Toaster />
      <div className="relative py-16 pb-11 overflow-x-auto shadow-md ">
        <div className="flex items-center justify-between bg-white dark:text-white dark:bg-gray-800">
          <div className="p-5 text-2xl font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            New Machine
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
            Update Machine Thumbnail <span className="text-red-500">*</span>
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
                      onely png,jpg,peng files
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
        {preview.length > 0 ? (
          <div className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <ul>
              {preview.map((img, idx) => (
                <li key={idx}>
                  <p className="text-center py-4 text-gray-500 dark:text-gray-400">
                    Current Machine Thumbnail
                  </p>
                  <img width={"100%"} src={img.preview} />
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
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              id="ft_email"
              name="shit"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required=""
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label
              htmlFor="float_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Title <span className="text-red-500">*</span>
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              id="title"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required=""
              onChange={(e) => setPoints(e.target.value)}
            />
            <label
              htmlFor="title"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              points <span className="text-red-500">*</span>
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <select
              id="floating_email"
              onChange={(e) => setLevel(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            >
              <option selected="">Choose a Level</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Level <span className="text-red-500">*</span>
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <select
              id="floating_email"
              onChange={(e) => setMachineType(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            >
              <option selected="">Choose a Machine Type</option>
              <option value="windows">Windows</option>
              <option value="Linux">Linux</option>
            </select>
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Machine Type <span className="text-red-500">*</span>
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required=""
              onChange={(e) => setUserFlag(e.target.value)}
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              User Flag <span className="text-red-500">*</span>
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
              onChange={(e) => setRootFlag(e.target.value)}
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Root Flag <span className="text-red-500">*</span>
            </label>
          </div>
        </div>
        {links.map((link, index) => (
          <>
            <div key={index} className="grid md:grid-cols-4 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="floating_email"
                  id="floating_email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required=""
                  onChange={(e) => handelAddedLinks(e, index)}
                />
                <label
                  htmlFor={`title` + index}
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
                  onChange={(e) => handelAddedLinks(e, index)}
                />
                <label
                  htmlFor={`link${index}`}
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  link <span className="text-red-500">*</span>
                </label>
              </div>
              <button
                onClick={(e) => addLinkInput(e)}
                className="text-blue-500 hover:text-blue-700 underline"
              >
                Add
              </button>
              <button
                onClick={(e) => removeLinkInput(e, index)}
                className="text-red-500 hover:text-red-700 underline"
              >
                remove
              </button>
            </div>
          </>
        ))}
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
