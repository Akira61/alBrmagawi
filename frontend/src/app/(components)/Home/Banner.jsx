"use client";
import { Typewriter } from "react-simple-typewriter";

export default function Banner() {
  return (
    <>
      <div
        style={{ backgroundImage: "url(/background-squars.svg)" }}
        className="wrapper py-10"
      >
        <ul className="flex items-center justify-between gap-[7vw] container">
          <li>
            <div className="col-12 flex flex-col gap-6 items-start pb-4 py-11">
              <div className="col-12">
                <h1
                  style={{ fontSize: "48px", fontWeight: 600 }}
                  className="items-center"
                >
                  The{" "}
                  <span class="text-sky-500 hover:text-sky-600 inline-block min-w-[4ch]">
                    <Typewriter
                      words={["#1", "one"]}
                      loop={true}
                      cursor
                      typeSpeed={120}
                      deleteSpeed={120}
                    />
                  </span>
                  platform to improve <br /> your{" "}
                  <span className="text-sky-500"></span>
                  cybersecurity skills
                </h1>
              </div>
              <p
                style={{ fontSize: "20px", fontWeight: 400 }}
                className="text-slate-400 max-w-[65ch]"
              >
                Albrmagawi gives individuals, businesses and universities the
                tools they need to continuously improve their cybersecurity
                capabilities
                <span className="text-white"> — all in one place.</span>
              </p>
              <a
                href="https://tailwindcss.com/docs"
                class="bg-gradient-to-r hover:bg-gradient-to-l flex items-center gap-2 from-sky-500 to-indigo-500 text-white px-5 py-4 rounded-sm hover:bg-slate-700"
              >
                <span>Get started</span>
                <span>&rarr;</span>
              </a>
            </div>
          </li>

          <li>
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
