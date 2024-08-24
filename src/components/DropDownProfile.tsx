"use client";
import React, { useState, useEffect } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from "@nextui-org/react";
import { app } from "@/src/config/FirebaseConfig";
import { getAuth, signOut } from "firebase/auth";
import UserIcon from "./icons/UserIcon";
import { useRouter } from "next/navigation";

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
