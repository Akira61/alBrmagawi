import AllBlogs from "@/app/(components)/Home/AllBlogs";
import AllCourses from "@/app/(components)/Home/AllCourses";
import Footer from "@/app/(components)/footer";

export default function Home() {
  return (
    <div>
      <div className="pb-44">
        <AllCourses />
      </div>
      <div className="py-4">
        <AllBlogs />
      </div>
      <Footer />
    </div>
  );
}
