import AllBlogs from "@/app/(components)/Home/AllBlogs";
import AllCourses from "@/app/(components)/Home/AllCourses";
import Banner from "@/app/(components)/Home/Banner";
import HomeSidebar from "@/app/(components)/Home/HomeSidebar";
import Footer from "@/app/(components)/footer";
import React from "react";

export default function Home() {
  return (
    <div>
      <HomeSidebar />
      <div className="p-4 mt-24 sm:ml-64">
        <div className="pb-44">
            <Banner />
        </div>
        <div className="pb-44">
          <AllCourses />
        </div>
        <div className="py-4">
          <AllBlogs />
        </div>
        <Footer />
      </div>
    </div>
  );
}
