import React from "react";
import ForgotPasswordPage from "./main";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Forgot Password | iShort URLs",
};

function ForgotPassword() {
  return (
    <>
      <ForgotPasswordPage />
    </>
  );
}

export default ForgotPassword;
