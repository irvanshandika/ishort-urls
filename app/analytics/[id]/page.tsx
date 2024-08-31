import React from "react";
import AnalyticsChart from "./main";
import SideBar from "@/src/components/Sidebar";

const AnalyticPage = () => {
  return (
    <>
      <SideBar>
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mt-8 mb-12">URL Analytics</h1>
          <main className="flex justify-center">
            <AnalyticsChart />
          </main>
        </div>
      </SideBar>
    </>
  );
};

export default AnalyticPage;
