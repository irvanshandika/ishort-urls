import React from "react";
import type { Metadata } from "next";
import NavigasiBar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import RedirectPage from "./main";

export const metadata: Metadata = {
  title: "Redirecting... | iShort URLs",
};

export default function Redirect({ params }: { params: { shortUrl: string } }) {
  return (
    <>
      <NavigasiBar />
      <RedirectPage params={params} />
      <Footer />
    </>
  );
}
