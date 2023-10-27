"use client";
import Kranox from "../ctf/Kranox";

export default function Content() {
  return (
    <>
      <div className="wrapper container py-20">
        <h1
          style={{ fontSize: "48px", fontWeight: 600 }}
          className="items-center text-center pb-10"
        >
          Cebarany provides
        </h1>
        <ul className="md:flex lg:md:flex items-center justify-between mx-auto mt-auto py-6 gap-4">
          <Kranox className="flex-1">
            <li className="text-center">
              <div className="flex justify-center">
                <img
                  className="rounded-t-lg"
                  src="https://hackthebox.com/images/landingv3/home/why-1.svg"
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
          <Kranox className="flex-1">
            <li className="text-center">
              <div className="flex justify-center">
                <img
                  className="rounded-t-lg"
                  src="https://hackthebox.com/images/landingv3/home/why-2.svg"
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
          <Kranox className="flex-1">
            <li className="text-center">
              <div className="flex justify-center">
                <img
                  className="rounded-t-lg"
                  src="https://hackthebox.com/images/landingv3/home/why-3.svg"
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
