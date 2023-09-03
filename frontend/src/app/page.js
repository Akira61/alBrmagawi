import Image from "next/image";
import Navbar from "./(components)/Navbar";
import Footer from "./(components)/footer";
import "./style/Home.css";
import Cards from "./(components)/Home/Cards";

export default function Home() {
  return (
    <>
      <main className="wrapper">
        <Navbar />

        <div className=" pb-4 py-11">
          <div className="col-12">
            <h1 style={{fontSize : '48px',fontWeight:600}} className="items-center text-center">
              The <span className="text-sky-500">#1</span> cybersecurity <br /> upskilling Arabic platform.
            </h1>
          </div>
          <div className="col-12">
            <p style={{fontSize:'20px',fontWeight:400}} className="text-center text-slate-400 ">
            Albrmagawi gives individuals, businesses and universities the
              tools they need to <br className="d-none d-lg-block" />{" "}
              continuously improve their cybersecurity capabilities{" "}
              <span className="text-white">— all in one place.</span>
            </p>
          </div>
        </div>

        <div className="py-20"></div>
        <Footer />
      </main>
    </>
  );
}
