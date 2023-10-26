import Image from "next/image";
import Navbar from "./(components)/Navbar";
import Footer from "./(components)/footer";
import "./style/Home.css";
import Cards from "./(components)/Home/Cards";
import Partner from "./(components)/Partners";
import Content from "./(components)/Home/Content";
import Banner from "./(components)/Home/Banner";
import About from "./(components)/Home/About";
import Carousel from "./(components)/Carousel";
import Testimonials from "./(components)/Home/testimonials";


export default function Home() {
  return (
    <>
      <main className="wrapper">
        <Navbar />

        <Banner />
        {/* <Partner /> */}
        <Content />
        <About />
        <Testimonials />
        {/* <Carousel /> */}
        <Footer />
      </main>
    </>
  );
}
