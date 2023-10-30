"use client";
import EditorJS from "@editorjs/editorjs";
import TextareaAutosize from "react-textarea-autosize";
import Header from "@editorjs/header";
import Embed from "@editorjs/embed";
import List from "@editorjs/list";
import Code from "@editorjs/code";
import Table from "@editorjs/table";
import editorLink from "@editorjs/link";
import InlineCode from "@editorjs/inline-code";
// import SimpleImage from "@editorjs/simple-image";
import ImageTool from "@editorjs/image";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import Underline from "@editorjs/underline";
import Delimiter from "@editorjs/delimiter";
import Paragraph from "@editorjs/paragraph";
import RawTool from "@editorjs/raw";
import Link from "next/link";
import { SimpleImage } from "./simple-image";
import { BsChevronLeft } from "react-icons/bs";
import "@/app/style/Simple-image.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function NewBlog({params}) {
  const {blogId} = params;
  const [title, setTitle] = useState("New Blog");
  const [content, setContent] = useState();
  useEffect(()=> {
    getBlogData();
  },[])
  async function getBlogData(){
    try {
      const {data} = await axios.get(`/api/blogs/${blogId}/getBlog`);
      console.log(data.data);
      setContent(data.data.content);
      setTitle(data.data.title)
    } catch (error) {
      console.log(error.message)
    }
  }
  const editor = new EditorJS({
    holder: "editorjs",
    placeholder: "Type here to write your post...",
    data: content,
    // data: {
    //   blocks: [
    //     {
    //       id: "oUq2g_tl8y",
    //       type: "header",
    //       data: {
    //         text: "Editor.js",
    //         level: 2,
    //       },
    //     },
    //   ],
    // },

    tools: {
      header: {
        class: Header,
        shortcut: "CMD+SHIFT+H",
      },
      Embed: {
        class: Embed,
      },
      List: {
        class: List,
      },
      Marker: {
        class: Marker,
      },
      Underline: Underline,
      Delimiter: Delimiter,
      Code: {
        class: Code,
      },
      Table: {
        class: Table,
      },
      Link: editorLink,
      InlineCode: {
        class: InlineCode,
      },
      Quote: Quote,
      Paragraph: {
        class: Paragraph,
        inlineToolbar: true,
      },
      raw: {
        class: RawTool,
        InlineCode: true,
        inlineToolbar: true,
      },
      //   Image: {
      //     class: ImageTool,
      //     config: {
      //       endpoints: {
      //         byFile: "http://localhost:8008/uploadFile", // Your backend file uploader endpoint
      //         byUrl: "http://localhost:8008/fetchUrl", // Your endpoint that provides uploading by Url
      //       },
      //     },
      //   },

      Image: {
        class: SimpleImage,
        inlineToolbar: true,
      },
    },

    onReady: () => {
      console.log("Editor.js is ready to work!");
    },
    onChange: (api, event) => {
      console.log("Editor's content changed!", event);
      // onSave();
    },
  });

  function onSave() {
    editor
      .save()
      .then(async (outputData) => {
        console.log("Article data: ", outputData);
        
        // api request to update blog
        try {
          const {data} = axios.post(`/api/blogs/editor`, {
            blogId: blogId,
            title: title,
            content: outputData,
          })
          console.log(data);
        } catch (error) {
          console.log(error.message)
        }
      })
      .catch((error) => {
        console.log("Saving failed: ", error);
      });
  }
  return (
    <div className="bg-white text-black h-screen">
      <div className="flex justify-between navigation py-7 px-16">
        <div className="flex items-center back">
          <Link
            href={`/dashboard`}
            className="flex items-center hover:bg-gray-100 p-3 rounded-md"
          >
            <BsChevronLeft /> <span className="px-2">Back</span>
          </Link>
        </div>
        <div className="save">
          <button
            onClick={onSave}
            className="bg-black text-white text-sm p-3 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
      {/* <h1 className="text-center text-5xl text-gray-500 pb-10">New Blog...</h1> */}
      <div className=" mx-auto w-[650px]">
        <TextareaAutosize
          autoFocus
          id="title"
          defaultValue={title}
          placeholder="Post title"
          className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
          onChange={(e)=> setTitle(e.target.value)}
        />
      </div>
        <div id="editorjs"></div>
        <p className="text-sm text-gray-500 mx-auto w-[650px]">
            Use{" "}
            <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
              Tab
            </kbd>{" "}
            to open the command menu.
          </p>
    </div>
  );
}
