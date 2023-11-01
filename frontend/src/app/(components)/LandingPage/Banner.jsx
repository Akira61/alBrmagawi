"use client";
import { Typewriter } from "react-simple-typewriter";
import Box from "../ctf/Box";
import Man from "@/app/assets/imgs/man.svg";
import Circles from "@/app/assets/imgs/circles.svg";

export default function Banner() {
  return (
    <div className="wrapper py-32 relative mt-16">
      <ul className="flex nomarker items-center justify-between gap-[7vw] container relative">
        <li className="flex-1">
          <div className="col-12 flex flex-col gap-6 items-start">
            <div className="col-12">
              <h1 className="items-center text-white text-4xl">
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
                platform to improve <br /> your cybersecurity skills
              </h1>
            </div>
            <p
              style={{ fontSize: "20px", fontWeight: 400 }}
              className="text-slate-400 max-w-[65ch] py-4"
            >
              Ceybarani gives individuals, businesses and universities the tools
              they need to continuously improve their cybersecurity capabilities
              <span className="text-white"> — all in one place.</span>
            </p>
            <Box>
              <a href="/ctfs" type="button" className="py-4 px-8">
                CTFS
              </a>
            </Box>
          </div>
        </li>

        <li className="flex-shrink">
          <div className="banner-img relative">
            <img className="w-80 relative z-10" src={Man.src} alt="" />
            <img className="absolute inset-0 scale-[250%] opacity-50 z-0 translate-y-12 -translate-x-24" src={Circles.src} alt="" />
          </div>
        </li>
      </ul>
    </div>
  );
}
