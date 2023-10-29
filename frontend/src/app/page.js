"use client";
import Navbar from "./(components)/Navbar";
import Footer from "./(components)/footer";
import "./style/Home.css";
import Content from "./(components)/LandingPage/Content";
import Banner from "./(components)/LandingPage/Banner";
import About from "./(components)/LandingPage/About";
import Arwes from "./(components)/Arwes";
import Testimonials from "./(components)/LandingPage/testimonials";

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
