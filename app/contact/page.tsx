import React from "react";
import NavigasiBar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import Contact from "./main";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | iShort URLs",
};

function ContactPage() {
  return (
    <>
      <NavigasiBar />
      <Contact />
      <Footer />
    </>
  );
}

export default ContactPage;
