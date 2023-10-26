"use client";
import AllCTFs from "@/app/(components)/ctf/AllCTFs";
import Arwes from "../../(components)/Arwes";
import "../../style/ctfs.css";
import Background from "@/app/(components)/ctf/Background";

export default function Allctfs() {
  return (
    <Arwes>
      <Background />
      <AllCTFs />
    </Arwes>
  );
}
