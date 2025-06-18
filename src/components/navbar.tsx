"use client";

import { cn } from "@/lib/utils";
import { MoveRight, PanelBottomOpen } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { MaxWidthWrapper } from "./max-width-wrapper";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";

export const Navbar = () => {
  const brandName = "telenova";
  const [activeIcon, setActiveIcon] = useState<string | undefined>();
  return (
    <nav className="sticky top-0 bg-white/1 backdrop-blur-xl z-40">
      <MaxWidthWrapper className="py-4 flex items-center justify-between">
        <ScrollLink
          to="home"
          spy={true}
          smooth={true}
          duration={100}
          onSetActive={(to) => setActiveIcon(to)}
          offset={-80}
          className="flex items-center gap-2 cursor-pointer"
        >
          <span className="-z-1">
            <Image src="/brand.svg" alt={brandName} height={30} width={30} />
          </span>
          <span className="hidden sm:block font-semibold capitalize text-lg">
            {brandName}
          </span>
        </ScrollLink>
        <ul className="flex items-center gap-6">
          {[
            { name: "Get app", link: "get-app" },
            { name: "Plans", link: "plans" },
          ].map((item, i) => (
            <li
              key={i}
              onClick={() => setActiveIcon(item.name)}
              className={cn(
                "hidden sm:block relative cursor-pointer text-sm group transition-all duration-300 ease-in-out",
                activeIcon === item.link && "font-semibold"
              )}
            >
              <ScrollLink
                to={item.link}
                spy={true}
                onSetActive={(to) => setActiveIcon(to)}
              >
                {item.name}
                <span
                  className={cn(
                    "absolute left-0 -bottom-1 h-0.5 bg-black w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left rounded",
                    activeIcon === item.link && "scale-x-100"
                  )}
                />
              </ScrollLink>
            </li>
          ))}
        </ul>

        <Button
          onClick={async () =>
            await signIn("google", { redirectTo: "/dashboard" })
          }
          className="hidden sm:flex capitalize cursor-pointer"
        >
          Try {brandName} <MoveRight className="size-4" />
        </Button>

        <div className="md:hidden">
          <Drawer>
            <DrawerTrigger asChild>
              <Button size="icon" className="bg-transparent">
                <PanelBottomOpen className="h-5 w-5 text-black" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="flex flex-col gap-8">
                <DrawerHeader>
                  <DrawerTitle>Menu</DrawerTitle>
                </DrawerHeader>
                <div className="flex flex-col gap-6 mb-10">
                  <ul className="flex flex-col items-center gap-6">
                    {[
                      { name: "Get app", link: "get-app" },
                      { name: "Plans", link: "plans" },
                    ].map((item, i) => (
                      <li
                        key={i}
                        onClick={() => setActiveIcon(item.name)}
                        className={cn(
                          "relative cursor-pointer text-sm group transition-all duration-300 ease-in-out text-black",
                          activeIcon === item.link && "font-semibold"
                        )}
                      >
                        <DrawerClose asChild>
                          <ScrollLink
                            to={item.link}
                            spy={true}
                            smooth={true}
                            duration={100}
                            onSetActive={(to) => setActiveIcon(to)}
                          >
                            {item.name}
                            <div
                              className={cn(
                                "absolute left-0 -bottom-1 h-0.5 bg-black w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left rounded",
                                activeIcon === item.link && "scale-x-100"
                              )}
                            />
                          </ScrollLink>
                        </DrawerClose>
                      </li>
                    ))}
                  </ul>

                  <DrawerClose asChild>
                    <Button
                      onClick={async () =>
                        await signIn("google", { redirectTo: "/dashboard" })
                      }
                      className="capitalize mx-auto px-10!"
                    >
                      Try {brandName} <MoveRight className="size-4" />
                    </Button>
                  </DrawerClose>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};
