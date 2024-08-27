import React from "react";
import type { Metadata } from "next";
import RedirectPage from "./main";

export const metadata: Metadata = {
  title: "Redirecting... | iShort URLs",
};

export default function Redirect({ params }: { params: { shortUrl: string } }) {
  return <RedirectPage params={params} />;
}
