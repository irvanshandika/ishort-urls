import React from "react";
import AboutPage from "./main";
import NavigasiBar from "@/src/components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Kami | iShort URLs",
};

function About() {
  return (
    <>
      <NavigasiBar />
      <AboutPage />
    </>
  );
}

export default About;
