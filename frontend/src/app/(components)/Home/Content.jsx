"use client";
import Kranox from "../ctf/Kranox";
import Lines from "@/app/assets/imgs/lines.svg"
import Lock from "@/app/assets/imgs/lock.png"
import Pass from "@/app/assets/imgs/pass.png"
import Doc from "@/app/assets/imgs/doc.png"

export default function Content() {
  return (
    <div className="relative">
      <img src={Lines.src} alt="lines" className="absolute bottom-0 -left-8 -right-8 mx-auto min-w-[105vw] w-[105vw] translate-y-1/2 opacity-50" />
      <div className="wrapper container py-20">
        <h1
          style={{ fontSize: "48px", fontWeight: 600 }}
          className="items-center text-center pb-10"
        >
          Ceybarani provides
        </h1>
        <ul className="md:flex lg:md:flex items-center justify-between mx-auto mt-auto py-6 gap-4">
          <Kranox className="flex-1 h-full">
            <li className="text-center flex items-center gap-4 flex-col py-8">
              <div className="h-48">
                <img
                  className="h-full object-contain"
                  src={Lock.src}
                  alt="product image"
                />
              </div>
              <div className="px-7 pb-10">
                <h5 className="text-xl pb-2 font-semibold tracking-tight text-gray-900 dark:text-white">
                  Courses
                </h5>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Anyone can learn, from zero to hero
                </p>
              </div>
            </li>
          </Kranox>
          <Kranox className="flex-1 h-full">
            <li className="text-center flex items-center gap-4 flex-col py-8">
              <div className="h-48">
                <img
                  className="h-full object-contain"
                  src={Pass.src}
                  alt="product image"
                />
              </div>
              <div className="px-7 pb-10">
                <h5 className="text-xl pb-2 font-semibold tracking-tight text-gray-900 dark:text-white">
                  CTFs
                </h5>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  There are always mountains to claimed, Chalange your self
                </p>
              </div>
            </li>
          </Kranox>
          <Kranox className="flex-1 h-full">
            <li className="text-center flex items-center gap-4 flex-col py-8">
              <div className="h-48">
                <img
                  className="h-full object-contain"
                  src={Doc.src}
                  alt="product image"
                />
              </div>
              <div className="px-7 pb-10">
                <h5 className="text-xl pb-2 font-semibold tracking-tight text-gray-900 dark:text-white">
                  Comunity
                </h5>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Comunity to support you and help you
                </p>
              </div>
            </li>
          </Kranox>
        </ul>
      </div>
    </div>
  );
}
