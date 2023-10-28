"use client";
import { Typewriter } from "react-simple-typewriter";
import Box from "../ctf/Box";
import Laptop from "@/app/assets/imgs/laptop.png";
import Lines from "@/app/assets/imgs/lines-1.svg"

export default function Banner() {
  return (
    <div className="relative">
      <img src={Lines.src} alt="lines" className="absolute left-0 right-0 top-0 translate-y-1/3 w-full opacity-50" />
      <div
        className="wrapper py-32"
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
                Ceybarani gives individuals, businesses and universities the
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
                className="w-[470px]"
                src={Laptop.src}
                alt="laptop image"
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
