"use client";

import { useRouter } from "next/navigation";
import Box from "@/app/(components)/ctf/Box";
import ModulSections from "../../blog/components/ModuleSections";
import Kranox from "@/app/(components)/ctf/Kranox";

const MODULE_SECTIONS = [
  { title: "Introduction" },
  { title: "Array of Bytes" },
  { title: "Scripting AoB" },
  { title: "Game Engines" },
  { title: "Unity IL2CPP" },
  { title: "Game Modifications" },
  { title: "Obfuscation" },
  { title: "DnSpy" },
  { title: "Creating a Mod" },
  { title: "External vs Internal & Injections" },
  { title: "Software Libraries" },
  { title: "C# Events and Attributes" },
  { title: "Runtime Hook Libraries" },
  { title: "Building a Runtime Hook" },
  { title: "Harmony Patching" },
  { title: "Fundamentals of Game Networking" },
  { title: "How Do Games Network" },
  { title: "Man In The Middle Attacks" },
  { title: "MITM Game Hacking" },
  { title: "Skills Assessment" },
];

export default function Course({ searchParams }) {
  const { section = 1 } = searchParams;
  const router = useRouter();

  return (
    <div className="p-4 lg:p-8">
      <h1 className="mb-8 text-4xl">Course</h1>
      <div className="flex gap-4 flex-col lg:flex-row-reverse">
        <ModulSections sections={MODULE_SECTIONS} />
        <Kranox className="flex-1">
          <div className="p-2">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=i4JcQn8aiuwDITEF"
              className="w-full h-auto object-contain aspect-video"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
        </Kranox>
      </div>
      <div className="flex items-center mt-4 gap-4">
        <Box>
          <button
            onClick={() => router.push(`?section=${Number(section) - 1}`)}
            className="p-4"
          >
            previous
          </button>
        </Box>
        <Box>
          <button
            onClick={() => router.push(`?section=${Number(section) + 1}`)}
            className="p-4"
          >
            next
          </button>
        </Box>
      </div>
    </div>
  );
}
