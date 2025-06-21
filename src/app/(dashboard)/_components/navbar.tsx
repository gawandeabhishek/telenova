"use client";

import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import {
  Bell,
  LogOut,
  Settings,
  Ticket,
  TicketCheck,
  TicketX,
  UserCog,
} from "lucide-react";
import Image from "next/image";
import { UserIcon } from "./user-icon";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

export const Navbar = () => {
  const brandName = "telenova";
  return (
    <nav className="sticky top-0 bg-white/10 backdrop-blur-xl z-40 select-none">
      <MaxWidthWrapper className="flex items-center justify-between py-4">
        <Link
          href="/dashboard"
          className="flex gap-2 items-center justify-center"
        >
          <span className="-z-1">
            <Image src="/brand.svg" alt={brandName} height={30} width={30} />
          </span>
          <span className="hidden sm:block font-semibold capitalize text-lg">
            {brandName}
          </span>
        </Link>
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center justify-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="cursor-pointer bg-background rounded-full p-2">
                  <Bell className="size-4" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-2 mt-2">
                <DropdownMenuLabel className="font-bold">
                  Notifications
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="flex flex-col gap-1">
                  {/* TODO: add backend */}
                  {[
                    {
                      _id: "fdsfsfd",
                      name: "Abhishek Gawande",
                      title: "Ironman 3",
                      tag: "Ticket to movie",
                      time: "1:00 pm (2nd Jun 2025)",
                    },
                    {
                      _id: "fdsfsfdsaffd",
                      name: "Abhishek Gawande",
                      title: "Ironman 3",
                      tag: "Ticket to movie",
                      time: "1:00 pm (2nd Jun 2025)",
                    },
                  ].map((no) => (
                    <DropdownMenuItem
                      key={no._id}
                      className="flex flex-col items-start bg-accent"
                      onSelect={(e) => e.preventDefault()}
                    >
                      <div className="flex flex-col items-start justify-center gap-2">
                        <div className="flex items-center justify-center gap-2">
                          <h3 className="font-semibold">{no.name}</h3>
                          <p className="flex items-center justify-center gap-2 text-xs text-white bg-indigo-600 py-1 px-3 rounded-full">
                            <Ticket className="text-white" />
                            {no.tag}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium">Movie: {no.title}</p>
                          <p className="text-[0.65rem] leading-[calc(1/0.65)]">
                            {no.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          size={"sm"}
                          className="cursor-pointer bg-green-600 hover:bg-green-700 text-xs"
                        >
                          <TicketCheck className="text-white" />
                          Accept
                        </Button>
                        <Button
                          size={"sm"}
                          className="cursor-pointer bg-slate-900 hover:bg-slate-700 text-xs"
                        >
                          <TicketX className="text-white" />
                          Reject
                        </Button>
                      </div>
                    </DropdownMenuItem>
                  ))}
                  <Link
                    href="/notifications"
                    className={cn(
                      buttonVariants({ variant: "default" }),
                      "cursor-pointer"
                    )}
                  >
                    Show More
                  </Link>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="bg-indigo-600 cursor-pointer text-white rounded-full p-2">
                  <Settings className="size-4" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mt-2">
                <DropdownMenuLabel className="font-bold">
                  Settings
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="flex flex-col gap-1">
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="font-medium text-xs">
                      <UserCog className="text-black" />
                      Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="font-medium text-xs"
                    onClick={() => signOut()}
                  >
                    <LogOut className="text-black" />
                    Logout
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <UserIcon />
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};
