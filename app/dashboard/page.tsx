import React from "react";
import Dashboard from "./main";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Dashboard | iShort URLs",
};

function DashboardPage() {
  return (
    <>
      <Dashboard />
    </>
  );
}

export default DashboardPage;
