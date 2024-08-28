import React from "react";
import ProfilePage from "./main";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile | iShort URLs",
};

function Profile() {
  return (
    <>
      <ProfilePage />
    </>
  );
}

export default Profile;
