'use client'
import { Typewriter } from 'react-simple-typewriter'

export default function Banner() {
  return (
    <>
      <div
        style={{ backgroundImage: "url(/background-squars.svg)" }}
        className="wrapper py-10"
      >
        <ul className="flex items-center justify-center gap-[7vw]">
          <li>
            <div className=" pb-4 py-11">
              <div className="col-12">
                <h1
                  style={{ fontSize: "48px", fontWeight: 600 }}
                  className="items-center text-center"
                >
                  {/* The <span className="text-sky-500">#1</span> cybersecurity <br /> upskilling Arabic platform. */}
                  The{" "}
                  <span class="text-sky-500 hover:text-sky-600">
                    <Typewriter 
                        words={['#1','one']}
                        loop={true}
                        cursor
                    />
                  </span>{""}
                  platform to improve <br /> your{" "}
                  <span className="text-sky-500"></span>
                  cybersecurity skills
                </h1>
              </div>
              <div className="col-12">
                <p
                  style={{ fontSize: "20px", fontWeight: 400 }}
                  className="text-center text-slate-400 "
                >
                  Albrmagawi gives individuals, businesses and universities the
                  tools they need to <br className="d-none d-lg-block" />{" "}
                  continuously improve their cybersecurity capabilities{" "}
                  <span className="text-white">— all in one place.</span>
                  <br />
                  <a
                    href="https://tailwindcss.com/docs"
                    class="text-sky-500 hover:text-sky-600"
                  >
                    Get started &rarr;
                  </a>
                </p>
              </div>
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
