import Kranox from "@/app/(components)/ctf/Kranox";
import { createFrameOctagonClip } from "@arwes/frames";

const data = {
  NiGhtMaRe: 1600,
  "linear algebra": 1200,
  1337: 1100,
  Algo: 800,
  Ayham: 400,
  OutSourcing: 400,
  QWKA0: 300,
  "glitch.dll": 300,
  "R-LORDS": 300,
  "₲lï†¢h 𝐓𝐞𝐚𝐦": 300,
  188: 300,
  "Mohammad Shyoukh": 200,
  "search ss": 200,
  "alian alzoubi": 100,
  Pal_Eagles: 100,
  helloworlds: 100,
};

export default function Challenges() {
  return (
    <>
      <h1 className="p-8 mb-8 text-4xl">Challenges</h1>
      <Kranox>
        <table
          style={{
            clipPath: createFrameOctagonClip({ squareSize: "1rem" }),
          }}
          className="w-full text-md text-left bg-jaguar border-collapse"
        >
          <thead className="text-xs uppercase dark:bg-russian-violet">
            <tr className="rounded-lg">
              <th scope="col" className="p-4">
                Name
              </th>
              <th scope="col" className="p-4">
                Score
              </th>
            </tr>
          </thead>
          <tbody className="bg-jaguar">
            {Object.entries(data).map(([name, score], idx) => (
              <tr key={idx} className="dark:hover:bg-russian-violet/30">
                <td className="px-4 py-2 font-medium text-jaguar whitespace-nowrap dark:text-white">
                  {name}
                </td>
                <td className="px-4 py-2 font-medium text-jaguar whitespace-nowrap dark:text-white">
                  {score}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Kranox>
    </>
  );
}
