import React from "react";
import "../../App.css";
import HeroSection from "../other/HeroSection";
import Footer from "../other/footer";
import Navbar from "../other/navbar";

function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />

      <Footer />
    </>
  );
}

export default Home;
