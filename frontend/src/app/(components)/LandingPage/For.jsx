import Box from "@/app/(components)/ctf/Box";
import Kranox from "../ctf/Kranox";

export default function For() {
  return (
    <section className="container my-12">
      <ul className="nomarker flex flex-col lg:flex-row gap-4 justify-between">
        {[
          {
            title: "For Business",
            description: "1k+ teams upskilled",
            cta: {
              label: "Get a Demo",
              href: "/contact",
            },
          },
          {
            title: "For Hackers",
            description: "2.3m+ hackers trained",
            cta: {
              label: "Join for Free",
              href: "/register",
            },
          },
          {
            title: "For Academia",
            description: "955 universities enrolled",
            cta: {
              label: "Enroll for Free",
              href: "/register",
            },
          },
        ].map(({ title, description, cta: { label, href } }, idx) => (
          <Kranox key={idx} className="h-full">
            <li className="flex px-4 py-8 h-full items-center flex-col gap-4 text-center">
              <h2>{title}</h2>
              <p>{description}</p>
              <Box className="mt-8">
                <a className="p-4 inline-block" href={href}>
                  {label}
                </a>
              </Box>
            </li>
          </Kranox>
        ))}
      </ul>
    </section>
  );
}
