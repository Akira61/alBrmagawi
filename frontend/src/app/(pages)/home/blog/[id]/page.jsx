"use client";

import { useRouter } from "next/navigation";
import Box from "@/app/(components)/ctf/Box";
import ModulSections from "../components/ModuleSections";
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

export default function BlogPost({searchParams}) {
  const { section = 1 } = searchParams;
  const router = useRouter();

  return (
    <div className="p-4 md:p-8">
      <h1 className="mb-8 text-4xl">Blog</h1>
      <Kranox className="mb-4">
        <div className="flex gap-4 p-4">
          <div className="flex-[.3]">
            <img
              className="w-full h-auto object-cover max-h-64"
              src="https://www.hackthebox.com/storage/tracks/27.png"
              alt=""
            />
          </div>
          <div className="flex-[.7]">
            <h4>Inroduction</h4>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta
              doloremque odio at explicabo expedita quaerat temporibus
              voluptatibus amet debitis, hic iure tempore vel numquam sed
              deserunt deleniti ipsa cupiditate facilis?
            </p>
          </div>
        </div>
      </Kranox>
      <div className="flex gap-4 flex-col md:flex-row-reverse">
        <ModulSections sections={MODULE_SECTIONS} />
        <article className="flex-[.7] list-disc marker prose-invert lg:prose-xl">
          <div>
            <h3>Module Summary</h3>
            <p>
              Game Reversing &amp; Modding is an evolution of the first module,{" "}
              <a href="https://academy.hackthebox.com/module/details/182">
                Game Hacking Fundamentals
              </a>
              , where we start to explore more practical and complex techniques
              to hack games:
            </p>
            <ul>
              <li>
                An overview of <code>Arrays of Bytes</code> (AoBs) and their
                significance in game hacking. Scripting AoBs in Cheat Engine and
                a look at commercial game engines, focusing on Unity, Unreal
                Engine, and Godot—a look into Unitys IL2CPP, its functionality,
                and how it affects game security.
              </li>
              <li>
                The art of <code>obfuscation </code>encompassing techniques like
                name obfuscation, string encryption, and control flow
                obfuscation to fortify software security.
              </li>
              <li>
                Examine external and internal game hacks, understanding their
                unique features, applications, and methodologies.
              </li>
              <li>
                Insights into software libraries specifically focusing on
                understanding binaries and dynamic link libraries (DLLs).
              </li>
              <li>
                C# <code>events </code>and <code>attributes</code>
              </li>
              <li>
                Exploring the realm of game modifications, diving into their
                history, types, and multiple strategies for crafting mods.
              </li>
              <li>
                A look at <code>DnSpy</code>, a potent tool designed for
                analysing and altering dotnet binaries. Utilising DnSpy, we will
                reverse-engineer a game, modifying it to transform the game
                environment.
              </li>
              <li>
                An introduction to runtime hook libraries like{" "}
                <code>BepInEx </code>and their importance in game hacking,
                coupled with implementing a library to inject into a game and
                modify its environment.
              </li>
              <li>
                <code>Game networking</code> fundamentals, highlighting
                peer-to-peer vs. client-server models, understanding latency,
                prediction, interpolation, handling packet loss, matchmaking,
                scalability, and network security intricacies.
              </li>
              <li>
                A thorough examination of <code>man-in-the-middle</code> (MITM)
                attacks, their methodology, and preventive techniques, both
                generally and specific to gaming. Well finalise with a practical
                approach to MITM game hacking, focusing on setup, analysis, and
                manipulation of a game’s HTTP calls.
              </li>
            </ul>
            <p>
              <strong>Important Requirements:</strong>
            </p>
            <ul>
              <li>
                This module is paired with several video games; you{" "}
                <code>will require</code> a laptop or a desktop computer with a
                GPU (Graphics Card). The <code>Intel HD 4600</code>,{" "}
                <code>AMD HD 6570</code> or <code>GeForce 9600GT</code> should
                be considered the bare minimum to get playable performance out
                of the game. You can try resizing the game to smaller dimensions
                if you are experiencing crippling performance.
              </li>
              <li>
                If you want to run it in a Virtual Machine, VMWare Player is
                preferred over VirtualBox for Virtualization on Windows and
                Linux and Parallels on ARM Macs. Be sure to enable{" "}
                <code>GPU Acceleration</code> in the VM settings where
                applicable.
              </li>
              <li>
                It’s recommended to go through the{" "}
                <a href="https://academy.hackthebox.com/module/details/228">
                  Introduction to C#
                </a>{" "}
                module, understand the C# language, and set up the dotNet SDK on
                the machine.
              </li>
              <li>
                For some of the games, your machine will require OpenVPN
                installed to connect to the academy lab VPN to interact with the
                labs.
              </li>
            </ul>
          </div>
        </article>
      </div>
      <div className="flex items-center gap-4">
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
