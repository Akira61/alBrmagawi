"use client";
import Kranox from "@/app/(components)/ctf/Kranox";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

const COURSES = [
  {
    id: 1,
    thumbnail: "https://academy.hackthebox.com/storage/paths/17/logo.png",
    description: "The Bug Bounty Hunter Job Role Path is for individuals who want to enter the world of Bug Bounty Hunting with little to no prior experience. This path covers core web application security assessment and bug bounty hunting concepts and provides a deep understanding of the attack tactics used during bug bounty hunting. Armed with the necessary theoretical background, multiple practical exercises, and a proven bug bounty hunting methodology, students will go through all bug bounty hunting stages, from reconnaissance and bug identification to exploitation, documentation, and communication to vendors/programs. Upon completing this job role path, you will have become proficient in the most common bug bounty hunting and attack techniques against web applications and be in the position of professionally reporting bugs to a vendor.",
    title: "Bug Bounty Hunter",
    cubesRequired: 1410,
  },
  {
    id: 2,
    thumbnail: "https://academy.hackthebox.com/storage/paths/17/logo.png",
    description: "The Bug Bounty Hunter Job Role Path is for individuals who want to enter the world of Bug Bounty Hunting with little to no prior experience. This path covers core web application security assessment and bug bounty hunting concepts and provides a deep understanding of the attack tactics used during bug bounty hunting. Armed with the necessary theoretical background, multiple practical exercises, and a proven bug bounty hunting methodology, students will go through all bug bounty hunting stages, from reconnaissance and bug identification to exploitation, documentation, and communication to vendors/programs. Upon completing this job role path, you will have become proficient in the most common bug bounty hunting and attack techniques against web applications and be in the position of professionally reporting bugs to a vendor.",
    title: "Bug Bounty Hunter",
    cubesRequired: 1410,
  },
  {
    id: 3,
    thumbnail: "https://academy.hackthebox.com/storage/paths/17/logo.png",
    description: "The Bug Bounty Hunter Job Role Path is for individuals who want to enter the world of Bug Bounty Hunting with little to no prior experience. This path covers core web application security assessment and bug bounty hunting concepts and provides a deep understanding of the attack tactics used during bug bounty hunting. Armed with the necessary theoretical background, multiple practical exercises, and a proven bug bounty hunting methodology, students will go through all bug bounty hunting stages, from reconnaissance and bug identification to exploitation, documentation, and communication to vendors/programs. Upon completing this job role path, you will have become proficient in the most common bug bounty hunting and attack techniques against web applications and be in the position of professionally reporting bugs to a vendor.",
    title: "Bug Bounty Hunter",
    cubesRequired: 1410,
  },
  {
    id: 4,
    thumbnail: "https://academy.hackthebox.com/storage/paths/17/logo.png",
    description: "The Bug Bounty Hunter Job Role Path is for individuals who want to enter the world of Bug Bounty Hunting with little to no prior experience. This path covers core web application security assessment and bug bounty hunting concepts and provides a deep understanding of the attack tactics used during bug bounty hunting. Armed with the necessary theoretical background, multiple practical exercises, and a proven bug bounty hunting methodology, students will go through all bug bounty hunting stages, from reconnaissance and bug identification to exploitation, documentation, and communication to vendors/programs. Upon completing this job role path, you will have become proficient in the most common bug bounty hunting and attack techniques against web applications and be in the position of professionally reporting bugs to a vendor.",
    title: "Bug Bounty Hunter",
    cubesRequired: 1410,
  },
  {
    id: 5,
    thumbnail: "https://academy.hackthebox.com/storage/paths/17/logo.png",
    description: "The Bug Bounty Hunter Job Role Path is for individuals who want to enter the world of Bug Bounty Hunting with little to no prior experience. This path covers core web application security assessment and bug bounty hunting concepts and provides a deep understanding of the attack tactics used during bug bounty hunting. Armed with the necessary theoretical background, multiple practical exercises, and a proven bug bounty hunting methodology, students will go through all bug bounty hunting stages, from reconnaissance and bug identification to exploitation, documentation, and communication to vendors/programs. Upon completing this job role path, you will have become proficient in the most common bug bounty hunting and attack techniques against web applications and be in the position of professionally reporting bugs to a vendor.",
    title: "Bug Bounty Hunter",
    cubesRequired: 1410,
  },
  {
    id: 6,
    thumbnail: "https://academy.hackthebox.com/storage/paths/17/logo.png",
    description: "The Bug Bounty Hunter Job Role Path is for individuals who want to enter the world of Bug Bounty Hunting with little to no prior experience. This path covers core web application security assessment and bug bounty hunting concepts and provides a deep understanding of the attack tactics used during bug bounty hunting. Armed with the necessary theoretical background, multiple practical exercises, and a proven bug bounty hunting methodology, students will go through all bug bounty hunting stages, from reconnaissance and bug identification to exploitation, documentation, and communication to vendors/programs. Upon completing this job role path, you will have become proficient in the most common bug bounty hunting and attack techniques against web applications and be in the position of professionally reporting bugs to a vendor.",
    title: "Bug Bounty Hunter",
    cubesRequired: 1410,
  },
  {
    id: 7,
    thumbnail: "https://academy.hackthebox.com/storage/paths/17/logo.png",
    description: "The Bug Bounty Hunter Job Role Path is for individuals who want to enter the world of Bug Bounty Hunting with little to no prior experience. This path covers core web application security assessment and bug bounty hunting concepts and provides a deep understanding of the attack tactics used during bug bounty hunting. Armed with the necessary theoretical background, multiple practical exercises, and a proven bug bounty hunting methodology, students will go through all bug bounty hunting stages, from reconnaissance and bug identification to exploitation, documentation, and communication to vendors/programs. Upon completing this job role path, you will have become proficient in the most common bug bounty hunting and attack techniques against web applications and be in the position of professionally reporting bugs to a vendor.",
    title: "Bug Bounty Hunter",
    cubesRequired: 1410,
  },
];

export default function Courses() {
  const pathname = usePathname();

  return (
    <Fragment>
      <h1 className="p-8 mb-8 text-center text-4xl">Courses</h1>
      <ul className="flex flex-col justify-center gap-y-8 gap-x-4">
        {COURSES.map(({ thumbnail, title, description, cubesRequired, id }) => (
          <Link href={`${pathname}/${id}`} key={id}>
            <Kranox hover className="flex-1">
              <div className="p-4 flex items-center flex-col md:flex-row gap-4">
                <div className="flex-[0.25]">
                  <img
                    className="object-contain w-full"
                    src={thumbnail}
                    alt={title}
                  />
                </div>
                <div className="flex flex-col gap-4 flex-[0.75]">
                  <h4>{title}</h4>
                  <p>{description}</p>
                  <span className="text-gray-500 text-xs">
                    Cubes Required: {cubesRequired}
                  </span>
                </div>
              </div>
            </Kranox>
          </Link>
        ))}
      </ul>
    </Fragment>
  );
}
