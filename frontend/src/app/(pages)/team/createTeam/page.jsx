"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "@/app/(components)/Navbar";
import Arwes from "@/app/(components)/Arwes";
import Kranox from "@/app/(components)/ctf/Kranox";
import Background from "@/app/(components)/ctf/Background";
import Box from "@/app/(components)/ctf/Box";

export default function CreateTeam() {
  const route = useRouter();
  const [error, setError] = useState();
  const [button, setButton] = useState("Create Team");
  const [teamLink, setTeamLink] = useState("");
  const [teamName, setTeamName] = useState("");
  const [teamPassword, setTeamPassword] = useState("");
  // validate password
  async function onSubmit(e) {
    e.preventDefault();
    setButton("Loading...");
    //reset errors if any
    setError("");
    try {
      // send api request to check if password correct
      const { data } = await axios.post(`/api/teams/createTeam`, {
        teamName: teamName,
        password: teamPassword,
      });
      console.log(data);
      if (data.err_message) {
        toast.error(data.err_message);
        setError(data.err_message);
        setButton("Create Team");
        return;
      }
      if (data.success) {
        toast.success(data.message);
        setButton("Create Team");
        return setTeamLink(`${window.location.host}/team/joinTeam/${teamName}`);
      }
    } catch (error) {
      console.log("`app/joinTeam` error: ", error.message);
    }
  }
  return (
    <Arwes>
      <Background />
      <Navbar />
      <Kranox className="max-w-lg mx-auto mt-36">
        <Toaster />
        <div className="p-4 sm:p-6 md:p-8 z-50">
          <form className="space-y-6" action="#">
            <h5 className="text-3xl py-5 text-center font-medium text-gray-900 dark:text-white">
              Create A Team
            </h5>
            <div>
              <Link
                className="text-green-500 text-center underline"
                href={`/team/joinTeam/${teamName}`}
              >
                {teamLink ? "Team Link: " + teamLink : ""}
              </Link>
            </div>
            <div className="text-red-500 text-center">{error}</div>

            <div className="relative z-0 w-full mb-6 grou]">
              <Box>
                <input
                  type="text"
                  className="block p-4 bg-transparent w-full focus:outline-none"
                  placeholder="Team Name"
                  required=""
                  onChange={(e) => setTeamName(e.target.value)}
                />
                <label htmlFor="floating_email" hidden>
                  Team Name
                </label>
              </Box>
            </div>
            <div className="relative z-0 w-full mb-6 grou]">
              <Box>
                <input
                  type="password"
                  className="block p-4 bg-transparent w-full focus:outline-none"
                  placeholder="Team Password"
                  required=""
                  onChange={(e) => setTeamPassword(e.target.value)}
                />
                <label htmlFor="floating_email" hidden>
                  Team Password
                </label>
              </Box>
            </div>

            <Box>
              <button
                type="submit"
                className="p-4 w-full text-center cursor-pointer"
                onClick={(e) => onSubmit(e)}
              >
                {button}
              </button>
            </Box>
          </form>
        </div>
      </Kranox>
    </Arwes>
  );
}
