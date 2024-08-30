import React from "react";
import Analytics from "./main";
import SideBar from "@/src/components/Sidebar";

const AnalyticPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <>
      <SideBar>
        <Analytics />
      </SideBar>
    </>
  );
};

export default AnalyticPage;
