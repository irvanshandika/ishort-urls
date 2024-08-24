/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/src/config/FirebaseConfig";
import { Spinner } from "@nextui-org/spinner";
import SideBar from "@/src/components/Sidebar";

const Dashboard: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/forbidden");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <>
        <div className="flex justify-center items-center h-screen">
          <Spinner label="Loading" color="primary" labelColor="primary" size="lg" />
        </div>
      </>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <SideBar>
        <div className="bg-gray-100 flex flex-col items-center justify-center">
          <div className="bg-white shadow-md p-8 rounded-lg max-w-lg w-full">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Welcome to your Dashboard, {user?.displayName}!</h1>
            <p className="text-gray-600 text-center mb-4">Here you can manage your account, view statistics, and more.</p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">Go to Profile</button>
          </div>
        </div>
      </SideBar>
    </>
  );
};

export default Dashboard;
