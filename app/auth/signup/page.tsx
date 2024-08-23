import React from "react";
import SignUpPage from "./main";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | iShort URLs",
};

function SignUp() {
  return (
    <>
      <SignUpPage />
    </>
  );
}

export default SignUp;
