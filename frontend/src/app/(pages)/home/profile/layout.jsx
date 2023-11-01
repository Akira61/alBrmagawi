"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Tabs from "../components/Tabs";

const LINKS = [
  {
    href: "profile",
    label: "Profile",
    children: [
      {
        href: "overview",
        label: "Overview",
      },
      {
        href: "activity",
        label: "Activity",
      },
      {
        href: "badges",
        label: "Badges",
      },
      {
        href: "certificates",
        label: "Certificates",
      },
    ],
  },
  {
    href: "settings",
    label: "Profile Settings",
  },
  {
    href: "billingnplans",
    label: "Billing & Plans",
  },
  {
    href: "team",
    label: "Create Team",
  },
];

export default function Layout({ children }) {
  const pathname = usePathname();
  const paths = pathname.split("/").splice(1);
  const isCurrentPath = (path, idx) => paths[idx] === path;

  //get user details from token
  let [userData, setUserData] = useState("");
  useEffect(() => {
    userDetails();
  }, []);
  async function userDetails() {
    try {
      const { data } = await axios.get("/api/tokenData");
      setUserData(data.data);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  return (
    <>
      <div className="flex items-start gap-8 px-8">
        <div>
          <img src="https://i.pravatar.cc/75" alt="" />
        </div>
        <div className="flex gap-2 flex-col flex-1">
          <div className="flex items-center gap-2">
            <span>Lorem ipsum</span>
            <span className="text-gray-500 text-sm">#19141281</span>
          </div>
          <div>Lorem ipsum dolor sit amet.</div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-gray-500">Rank</span>
          <span>lorem</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-gray-500">Plan Type</span>
          <span className="text-sm">lorem</span>
          <span className="text-sm">Go Hacker</span>
        </div>
      </div>
      <Tabs
        className="mt-4"
        tabs={LINKS}
        paths={paths}
        isCurrentPath={(href) => isCurrentPath(href, 2)}
        slicePathEnd={2}
      />
      {LINKS.map(
        ({ href, children }) =>
          children?.length &&
          isCurrentPath(href, 2) && (
            <Tabs
              key={href}
              tabs={children}
              paths={paths}
              isCurrentPath={(href) => isCurrentPath(href, 3)}
                slicePathEnd={1}
            />
          ),
      )}
      {children}
    </>
  );
}
