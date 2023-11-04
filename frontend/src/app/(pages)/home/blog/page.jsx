"use client";
import Kranox from "@/app/(components)/ctf/Kranox";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

const BLOGS = [
  {
    id: 1,
    thumbnail: "https://www.hackthebox.com/storage/tracks/27.png",
    title: "Intro to Android Exploitation",
    author: "HackTheBox",
    likesCount: 217,
  },
  {
    id: 2,
    thumbnail: "https://www.hackthebox.com/storage/tracks/27.png",
    title: "Intro to Android Exploitation",
    author: "HackTheBox",
    likesCount: 217,
  },
  {
    id: 3,
    thumbnail: "https://www.hackthebox.com/storage/tracks/27.png",
    title: "Intro to Android Exploitation",
    author: "HackTheBox",
    likesCount: 217,
  },
  {
    id: 4,
    thumbnail: "https://www.hackthebox.com/storage/tracks/27.png",
    title: "Intro to Android Exploitation",
    author: "HackTheBox",
    likesCount: 217,
  },
  {
    id: 5,
    thumbnail: "https://www.hackthebox.com/storage/tracks/27.png",
    title: "Intro to Android Exploitation",
    author: "HackTheBox",
    likesCount: 217,
  },
  {
    id: 6,
    thumbnail: "https://www.hackthebox.com/storage/tracks/27.png",
    title: "Intro to Android Exploitation",
    author: "HackTheBox",
    likesCount: 217,
  },
  {
    id: 7,
    thumbnail: "https://www.hackthebox.com/storage/tracks/27.png",
    title: "Intro to Android Exploitation",
    author: "HackTheBox",
    likesCount: 217,
  },
  {
    id: 8,
    thumbnail: "https://www.hackthebox.com/storage/tracks/27.png",
    title: "Intro to Android Exploitation",
    author: "HackTheBox",
    likesCount: 217,
  },
];

export default function Blog() {
  const pathname = usePathname();
  return (
    <Fragment>
      <h1 className="p-8 mb-8 text-center text-4xl">Blog</h1>
      <ul className="flex flex-wrap justify-center gap-y-8 gap-x-4">
        {BLOGS.map(({ thumbnail, title, author, likesCount, id }) => (
          <Link href={`${pathname}/${id}`} key={id}>
            <Kranox hover className="max-w-xs flex-1">
              <div className="p-4 flex  flex-col gap-4">
                <div>
                  <img
                    className="aspect-square w-full"
                    src={thumbnail}
                    alt={title}
                  />
                </div>
                <h4>{title}</h4>
                <span className="text-gray-500 text-sm">By {author}</span>
                <span className="text-gray-500 text-xs">
                  {likesCount} LIKES
                </span>
              </div>
            </Kranox>
          </Link>
        ))}
      </ul>
    </Fragment>
  );
}
