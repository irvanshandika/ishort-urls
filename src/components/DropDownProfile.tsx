"use client";
import React, { useState, useEffect } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from "@nextui-org/react";
import { app } from "@/src/config/FirebaseConfig";
import { getAuth, signOut } from "firebase/auth";
import UserIcon from "./icons/UserIcon";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function DropdownProfile() {
  const [user, setUser] = useState<any>(null);
  const auth = getAuth();
  const router = useRouter();

  useEffect(() => {
    const authInstance = getAuth(app);
    const unsubscribe = authInstance.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      toast.custom((t) => (
        <>
          <div className={`${t.visible ? "animate-enter" : "animate-leave"} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
            <div className="flex items-center justify-between w-full p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Signed out successfully</p>
                </div>
              </div>
              <div className="flex-shrink-0 ml-4">
                <button className="text-gray-400 hover:text-gray-500" onClick={() => toast.dismiss(t.id)}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>
          </div>
        </>
      ));
      router.push("/");
      await signOut(auth);
    } catch (error: any) {
      console.log("Error signing out: ", error.message);
    }
  };
  return (
    <Dropdown>
      <DropdownTrigger>
        <button>{user && user.photoURL ? <Avatar src={user.photoURL} className="w-10 h-10 text-large" /> : <UserIcon className="w-10 h-10" />}</button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{user && user.email}</p>
        </DropdownItem>
        <DropdownItem key="dashboard" onClick={() => router.push("/dashboard")}>
          Dashboard
        </DropdownItem>
        <DropdownItem key="signout" className="text-danger" color="danger" onClick={handleLogout}>
          Sign Out
          <span className="ml-2">
            <i className="fa-solid fa-right-from-bracket"></i>
          </span>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
