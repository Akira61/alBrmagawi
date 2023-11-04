import Kranox from "../ctf/Kranox";

const TESTIMONIALS = [
  {
    name: "Alexis Lingad",
    company: "Information Security Analyst, PUMA SE",
    content:
      "Since I manage penetration testing in the company, I have to train our specialists in penetration testing from time to time to ensure that the quality of our results is high. I believe in the “learning by doing” principle, so I setup gamified labs, and capture-the-flag competitions. We then introduced Hack The Box Academy to the team. The team can now quickly learn by themselves through the theoretical and practical side of penetration testing with very in-depth and up-to-date materials without the need of requested labs or challenges to be built for them. As of now, to spice up the learning, we have a “Hacker of the Month” where we recognize the most progressive employee in our Hack The Box platform.",
  },
  {
    name: "Alexis Lingad",
    company: "Information Security Analyst, PUMA SE",
    content:
      "Since I manage penetration testing in the company, I have to train our specialists in penetration testing from time to time to ensure that the quality of our results is high. I believe in the “learning by doing” principle, so I setup gamified labs, and capture-the-flag competitions. We then introduced Hack The Box Academy to the team. The team can now quickly learn by themselves through the theoretical and practical side of penetration testing with very in-depth and up-to-date materials without the need of requested labs or challenges to be built for them. As of now, to spice up the learning, we have a “Hacker of the Month” where we recognize the most progressive employee in our Hack The Box platform.",
  },
  {
    name: "Alexis Lingad",
    company: "Information Security Analyst, PUMA SE",
    content:
      "Since I manage penetration testing in the company, I have to train our specialists in penetration testing from time to time to ensure that the quality of our results is high. I believe in the “learning by doing” principle, so I setup gamified labs, and capture-the-flag competitions. We then introduced Hack The Box Academy to the team. The team can now quickly learn by themselves through the theoretical and practical side of penetration testing with very in-depth and up-to-date materials without the need of requested labs or challenges to be built for them. As of now, to spice up the learning, we have a “Hacker of the Month” where we recognize the most progressive employee in our Hack The Box platform.",
  },
  {
    name: "Alexis Lingad",
    company: "Information Security Analyst, PUMA SE",
    content:
      "Since I manage penetration testing in the company, I have to train our specialists in penetration testing from time to time to ensure that the quality of our results is high. I believe in the “learning by doing” principle, so I setup gamified labs, and capture-the-flag competitions. We then introduced Hack The Box Academy to the team. The team can now quickly learn by themselves through the theoretical and practical side of penetration testing with very in-depth and up-to-date materials without the need of requested labs or challenges to be built for them. As of now, to spice up the learning, we have a “Hacker of the Month” where we recognize the most progressive employee in our Hack The Box platform.",
  },
];

export default function Testimonials() {
  return (
    <section className="container py-24">
      <h1 className="mb-4">
        Loved by hackers.
        <br />Trusted by enterprises.
      </h1>
      <ul className="nomarker flex flex-col lg:flex-row snap-x py-2 snap-mandatory gap-4 overflow-x-auto">
        {TESTIMONIALS.map(({ name, company, content }, idx) => (
          <Kranox
            key={idx}
            className="snap-start lg:max-w-[45%] lg:min-w-[45%] lg:w-[45%] flex flex-col gap-4"
          >
            <li className="p-8">
              <p className="flex-1">{content}</p>
              <h6 className="mt-12 mb-2">{name}</h6>
              {company && <span>{company}</span>}
            </li>
          </Kranox>
        ))}
      </ul>
    </section>
  );
}
