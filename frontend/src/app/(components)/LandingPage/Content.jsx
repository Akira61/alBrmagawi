"use client";
import Kranox from "../ctf/Kranox";
import CD from "@/app/assets/imgs/cd.png"
import Flags from "@/app/assets/imgs/flags.svg"
import Book from "@/app/assets/imgs/book.png"

export default function Content() {
  return (
    <>
      <div id="provides" className="wrapper container py-20">
        <h1
          style={{ fontSize: "48px", fontWeight: 600 }}
          className="items-center text-center pb-10"
        >
          Ceybarani provides
        </h1>
        <ul className="md:flex lg:md:flex items-center justify-between mx-auto mt-auto py-6 gap-4">
          <Kranox hover className="flex-1 h-full">
            <li className="text-center flex items-center gap-4 flex-col py-8">
              <div className="h-48">
                <img
                  className="h-full object-contain"
                  src={CD.src}
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
          <Kranox hover className="flex-1 h-full">
            <li className="text-center flex items-center gap-4 flex-col py-8">
              <div className="h-48">
                <img
                  className="h-[70%] object-contain"
                  src={Flags.src}
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
          <Kranox hover className="flex-1 h-full">
            <li className="text-center flex items-center gap-4 flex-col py-8">
              <div className="h-48">
                <img
                  className="h-full object-contain"
                  src={Book.src}
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
    </>
  );
}
