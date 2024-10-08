"use client";
import React, { useState, useEffect } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button } from "@nextui-org/react";
import { app } from "@/src/config/FirebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import DropdownProfile from "@/src/components/DropDownProfile";
import Logo from "@/src/components/images/Logo.webp";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Trakteer from "./Trakteer";

export default function NavigasiBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const auth = getAuth(app);
  const pathname = usePathname(); // Get the current path

  const menuItems = [
    {
      title: "Home",
      href: "/",
      label: "Home",
    },
    {
      title: "About",
      href: "/about",
      label: "About",
    },
    {
      title: "Contact",
      href: "/contact",
      label: "Contact",
    },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="sm:hidden" />
        <NavbarBrand>
          <Link href="/">
            <Image src={Logo} alt="Logo Brand" className="lg:w-[100px] lg:h-[100px] size-20" priority width={32} height={32} />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem key={index}>
            <Link color={index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"} href={item.href} className={pathname === item.href ? "font-bold text-blue-600" : ""} aria-label={item.label}>
              {item.title}
            </Link>
          </NavbarItem>
        ))}
        <NavbarItem>
          <Trakteer />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {user ? (
          <DropdownProfile />
        ) : (
          <>
            <NavbarItem className="flex">
              <Link href="/auth/signin">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="/auth/signup" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link color={index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"} className={`w-full ${pathname === item.href ? "font-bold text-blue-600" : ""}`} href={item.href} size="lg">
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarItem>
          <Trakteer />
        </NavbarItem>
      </NavbarMenu>
    </Navbar>
  );
}
