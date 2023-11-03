"use client";
import Tabs from "../components/Tabs";
import { usePathname } from "next/navigation";

const LINKS = [
  {
    href: "active",
    label: "Active Challenges",
  },
  {
    href: "retired",
    label: "Retired Challenges",
  },
];

export default function Layout({ children }) {
  const pathname = usePathname();
  const paths = pathname.split("/").splice(1);
  const isCurrentPath = (path, idx) => paths[idx] === path;

  return (
    <>
      <Tabs
        className="mt-4"
        tabs={LINKS}
        paths={paths}
        isCurrentPath={(href) => isCurrentPath(href, 2)}
        slicePathEnd={1}
      />
      {children}
    </>
  );
}
