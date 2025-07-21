"use client"
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { button, link as linkStyles, menuItem } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { useState } from "react";
import { PlaceholdersAndVanishInputDemo } from "./search";

export const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleMouseEnter = (dropdown) => {
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <>
      {/* Main Navbar */}
      <NextUINavbar 
        maxWidth="xl" 
        position="sticky" 
        className="bg-background/95 z-50 backdrop-blur-md border-b border-divider supports-[backdrop-filter]:bg-background/60"
      >
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink className="flex justify-start items-center gap-2" href="/">
              <div className="w-8 h-8 bg-red-500 dark:bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <h1 className="font-bold text-xl text-foreground">Glomni Designs</h1>
            </NextLink>
          </NavbarBrand>
          
          <ul className="hidden lg:flex gap-8 justify-start ml-8">
            <NavbarItem>
              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnter('design')}
                onMouseLeave={handleMouseLeave}
              >
                <Button
                  variant="light"
                  className="p-0 h-auto min-w-0 text-foreground-600 hover:text-foreground font-medium data-[hover=true]:bg-transparent"
                  endContent={<span className="ml-1">▼</span>}
                >
                  Design Ideas
                </Button>
                {activeDropdown === 'design' && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-background border border-divider rounded-md shadow-lg z-50">
                    <Link href="/living-room" className="block px-4 py-2 text-sm text-foreground-600 hover:text-foreground hover:bg-default-100">Living Room</Link>
                    <Link href="/bedroom" className="block px-4 py-2 text-sm text-foreground-600 hover:text-foreground hover:bg-default-100">Bedroom</Link>
                    <Link href="/kitchen" className="block px-4 py-2 text-sm text-foreground-600 hover:text-foreground hover:bg-default-100">Kitchen</Link>
                    <Link href="/bathroom" className="block px-4 py-2 text-sm text-foreground-600 hover:text-foreground hover:bg-default-100">Bathroom</Link>
                  </div>
                )}
              </div>
            </NavbarItem>
            
            <NavbarItem>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium text-foreground-600 hover:text-foreground font-medium",
                )}
                href="/portfolio"
              >
                Portfolio
              </NextLink>
            </NavbarItem>
            
            <NavbarItem>
              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnter('more')}
                onMouseLeave={handleMouseLeave}
              >
                <Button
                  variant="light"
                  className="p-0 h-auto min-w-0 text-foreground-600 hover:text-foreground font-medium data-[hover=true]:bg-transparent"
                  endContent={<span className="ml-1">▼</span>}
                >
                  More
                </Button>
                {activeDropdown === 'more' && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-background border border-divider rounded-md shadow-lg z-50">
                    <Link href="/about" className="block px-4 py-2 text-sm text-foreground-600 hover:text-foreground hover:bg-default-100">About Us</Link>
                    <Link href="/careers" className="block px-4 py-2 text-sm text-foreground-600 hover:text-foreground hover:bg-default-100">Careers</Link>
                    <Link href="/contact" className="block px-4 py-2 text-sm text-foreground-600 hover:text-foreground hover:bg-default-100">Contact</Link>
                  </div>
                )}
              </div>
            </NavbarItem>
          </ul>
        </NavbarContent>

        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          <NavbarItem className="hidden sm:flex gap-2">
          <PlaceholdersAndVanishInputDemo/>
            <ThemeSwitch />
          </NavbarItem>
          <NavbarItem className="hidden lg:flex">
            <Button 
              className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium"
              size="sm"
            > Talk To Expert
            </Button>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          <ThemeSwitch />
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarMenu className="bg-background">
          <div className="mx-4 mt-2 flex flex-col gap-2">
            {siteConfig.navMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  color={
                    index === 0
                      ? "primary"
                      : index === siteConfig.navMenuItems.length
                        ? "danger"
                        : "foreground"
                  }
                  href="#"
                  size="lg"
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
            <Button className="bg-green-500 dark:bg-green-600 text-white mt-4">
              <span className="bg-red-500 dark:bg-red-600 text-white px-2 py-1 rounded text-xs mr-2">NEW</span>
              Shop Furnishings
            </Button>
          </div>
        </NavbarMenu>
      </NextUINavbar>
    </>
  );
};
