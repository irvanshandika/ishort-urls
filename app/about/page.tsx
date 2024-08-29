import React from "react";
import AboutPage from "./main";
import NavigasiBar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | iShort URLs",
};

function About() {
  return (
    <>
      <NavigasiBar />
      <AboutPage />
      <Footer />
    </>
  );
}

export default About;
