"use client";
import { Typewriter } from "react-simple-typewriter";
import Box from "../ctf/Box";

export default function Banner() {
  return (
    <>
      <div
        className="wrapper my-32"
      >
        <ul className="flex items-center justify-between gap-[7vw] container relative">
          <li className="flex-1">
            <div className="col-12 flex flex-col gap-6 items-start">
              <div className="col-12">
                <h1
                  className="items-center text-white text-4xl"
                >
                  The{" "}
                  <span className="text-sky-500 hover:text-sky-600 inline-block min-w-[4ch]">
                    <Typewriter
                      words={["#1", "one"]}
                      loop={true}
                      cursor
                      typeSpeed={120}
                      deleteSpeed={120}
                    />
                  </span>
                  platform to improve <br /> your{" "}
                  cybersecurity skills
                </h1>
              </div>
              <p
                style={{ fontSize: "20px", fontWeight: 400 }}
                className="text-slate-400 max-w-[65ch] py-4"
              >
                Albrmagawi gives individuals, businesses and universities the
                tools they need to continuously improve their cybersecurity
                capabilities
                <span className="text-white"> — all in one place.</span>
              </p>
              <Box>
                <a
                  href="/ctfs"
                  type="button"
                  className="py-4 px-8"
                >
                  CTFS
                </a>
              </Box>
            </div>
          </li>

          <li className="flex-shrink">
            <div className="banner-img">
              <img
                className="rounded-t-lg w-[470px]"
                src="https://hackthebox.com/images/landingv3/home/why-3.svg"
                alt="product image"
              />
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
