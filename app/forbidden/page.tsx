import React from "react";
import Forbidden from "./main";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forbidden | iShort URLs",
};

function ForbiddenPage() {
  return (
    <>
      <Forbidden />
    </>
  );
}

export default ForbiddenPage;
