import React from "react";
import SignInPage from "./main";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Sign In | iShort URLs",
};

function SignIn() {
  return (
    <>
      <SignInPage />
    </>
  );
}

export default SignIn;
