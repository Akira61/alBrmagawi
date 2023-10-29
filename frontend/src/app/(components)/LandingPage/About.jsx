import Lines from "@/app/assets/imgs/lines.svg"
import AboutSvg from "@/app/assets/imgs/about.svg"
import Cyberani from "@/app/assets/imgs/cyberani.png"

export default function About() {
  return (
    <div className="relative">
      <img src={Lines.src} alt="lines" className="absolute bottom-0 -left-8 -right-8 mx-auto min-w-[105vw] w-[105vw] opacity-40" />
      <section className="py-20 container relative">
        <h1
          style={{ fontSize: "48px", fontWeight: 600 }}
          className="items-center text-center pb-10"
        >
          About us
        </h1>
        <div>
          <div className="gap-16 items-center py-8 mx-auto lg:grid lg:grid-cols-2 lg:py-16">
            <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                We didn&apos;t reinvent the wheel
              </h2>
              <p className="mb-4">
                We are strategists, designers and developers. Innovators and
                problem solvers. Small enough to be simple and quick, but big
                enough to deliver the scope you want at the pace you need. Small
                enough to be simple and quick, but big enough to deliver the
                scope you want at the pace you need.
              </p>
              <p>
                We are strategists, designers and developers. Innovators and
                problem solvers. Small enough to be simple and quick.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <img
                className="w-full rounded-lg"
                src={Cyberani.src}
                alt="office content 1"
              />
              <img
                className="mt-4 w-full lg:mt-10 rounded-lg"
                src={AboutSvg.src}
                alt="office content 2"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
