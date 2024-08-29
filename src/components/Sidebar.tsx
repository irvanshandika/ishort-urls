"use client";
import React, { useState, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/src/components/ui/sidebar";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/src/lib/utils";
import DashboardIcon from "./icons/DashboardIcon";
import Image from "next/image";
import BrandLogo from "@/src/components/images/Logo.webp";
import { app } from "@/src/config/FirebaseConfig";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import UserIcon from "./icons/UserIcon";
import ProfileUser from "./icons/ProfileUser";

export default function SideBar({ children }: { children: React.ReactNode }) {
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <DashboardIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Profile",
      href: "/profile",
      icon: <ProfileUser className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
  ];
  const [open, setOpen] = useState(false);
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
      await signOut(auth); // Tunggu sampai signOut selesai
      router.push("/"); // Setelah berhasil logout, arahkan ke halaman utama
    } catch (error: any) {
      console.log("Error signing out: ", error.message);
    }
  };

  return (
    <div className={cn("rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden", "h-screen")}>
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
              <SidebarLink
                link={{
                  label: "Logout",
                  href: "#",
                  icon: <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
                }}
                onClick={handleLogout}
              />
            </div>
          </div>
          <div>
            {user && user.photoURL ? (
              <SidebarLink
                link={{
                  label: `${user && user.displayName}`,
                  href: "#",
                  icon: <Image src={user.photoURL} className="h-7 w-7 flex-shrink-0 rounded-full" width={50} height={50} alt="Avatar" />,
                }}
              />
            ) : (
              <SidebarLink
                link={{
                  label: `${user && user.displayName}`,
                  href: "#",
                  icon: <UserIcon className="h-7 w-7 flex-shrink-0 rounded-full" />,
                }}
              />
            )}
          </div>
        </SidebarBody>
        <div className="flex flex-1">
          <div className="p-2 md:p-10 rounded-tl-2xl flex flex-col gap-2 flex-1 w-full h-full overflow-y-auto">{children}</div>
        </div>
      </Sidebar>
    </div>
  );
}

export const Logo = () => {
  return (
    <Link href="/" className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
      <Image src={BrandLogo} alt="Brand Logo" width={100} height={100} className="h-[50px] w-[50px] flex-shrink-0" />
      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-medium text-black dark:text-white whitespace-pre">
        iShort URLs
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link href="/" className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
      <Image src={BrandLogo} alt="Brand Logo" width={100} height={100} className="h-7 w-7 flex-shrink-0" />
    </Link>
  );
};
