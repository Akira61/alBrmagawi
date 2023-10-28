"use client";
import Navbar from "./(components)/Navbar";
import Footer from "./(components)/footer";
import "./style/Home.css";
import Content from "./(components)/Home/Content";
import Banner from "./(components)/Home/Banner";
import About from "./(components)/Home/About";
import Arwes from "./(components)/Arwes";
import Testimonials from "./(components)/Home/testimonials";

export default function Home() {
  return (
    <Arwes nobg>
      <main className="wrapper bg-jaguar bg-gradient-radial to-jaguar via-russian-violet/30 from-cetacean-blue/90">
        <Navbar />
        <Banner />
        {/* <Partner /> */}
        <Content />
        <About />
        <Testimonials />
        {/* <Carousel /> */}
        <Footer />
      </main>
    </Arwes>
  );
}
