"use client"
import HomeSidebar from "@/app/(components)/Home/HomeSidebar";
import Arwes from "@/app/(components)/Arwes";
import Background from "@/app/(components)/ctf/Background";

export default function Layout({ children }) {
  return (
    <Arwes>
      <Background />
      <HomeSidebar />
      <div className="p-4 relative z-10 mt-24 ml-64">{children}</div>
    </Arwes>
  );
}
