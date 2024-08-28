"use client";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/src/config/FirebaseConfig";
import { Spinner } from "@nextui-org/spinner";
import SideBar from "@/src/components/Sidebar";
import ShortUrlsList from "@/src/ServerComponents/dashboard/ShortUrlsList";

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
      <div className="flex justify-center items-center h-screen">
        <Spinner label="Loading" color="primary" labelColor="primary" size="lg" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <SideBar>
        <div className="min-h-screen flex flex-col items-center p-8">
          <ShortUrlsList />
        </div>
      </SideBar>
    </>
  );
};

export default Dashboard;
