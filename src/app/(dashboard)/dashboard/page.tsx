"use client";

import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Code, LockKeyhole, Pencil, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import TimePicker from "../_components/ui/time-picker";
import { FaEarthAmericas } from "react-icons/fa6";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Page = () => {
  const [selectedDate, setSelectedDate] = useState<{
    date: string;
  }>();

  const users = [
    {
      id: 1,
      image: "/default-user.svg",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
    },
    {
      id: 2,
      image: "/default-user.svg",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "Owner",
    },
    {
      id: 3,
      image: "/default-user.svg",
      name: "Robert Johnson",
      email: "robert.j@example.com",
      role: "Member",
    },
    {
      id: 4,
      image: "/default-user.svg",
      name: "Emily Davis",
      email: "emily.d@example.com",
      role: "Viewer",
    },
    {
      id: 5,
      image: "/default-user.svg",
      name: "Michael Brown",
      email: "michael.b@example.com",
      role: "Member",
    },
    {
      id: 6,
      image: "/default-user.svg",
      name: "Sarah Wilson",
      email: "sarah.w@example.com",
      role: "Viewer",
    },
    {
      id: 7,
      image: "/default-user.svg",
      name: "David Taylor",
      email: "david.t@example.com",
      role: "Admin",
    },
    {
      id: 8,
      image: "/default-user.svg",
      name: "Lisa Anderson",
      email: "lisa.a@example.com",
      role: "Member",
    },
  ];

  const getRoleBadgeStyles = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-blue-100 text-blue-600";
      case "Owner":
        return "bg-pink-100 text-pink-600";
      case "Member":
        return "bg-blue-100 text-blue-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };
  return (
    <main className="bg-background">
      <MaxWidthWrapper className="flex flex-col gap-6 pb-10 max-h-[200dvh] sm:max-h-[130dvh] lg:max-h-[92.5dvh]">
        <div className="flex flex-col sm:flex-col lg:flex-row items-center gap-4">
          <div className="flex sm:hidden lg:flex flex-col items-center justify-center w-full sm:w-auto">
            <div className="flex gap-2 py-4 sm:w-auto">
              {[
                { date: "17", day: "Mon" },
                { date: "18", day: "Tue" },
                { date: "19", day: "Wed" },
                { date: "20", day: "Thu" },
                { date: "21", day: "Fri" },
              ].map((data, i) => (
                <div
                  className={cn(
                    "flex flex-col items-center justify-center py-2 px-4 sm:py-4 sm:px-6 rounded-lg sm:h-20 cursor-pointer select-none",
                    data.date === selectedDate?.date
                      ? "ring-2 ring-indigo-600 ring-inset"
                      : "bg-white"
                  )}
                  key={i}
                  onClick={() => setSelectedDate(data)}
                >
                  <h3
                    className={cn(
                      "font-medium text-sm sm:text-lg",
                      data.date === selectedDate?.date && "text-indigo-600"
                    )}
                  >
                    {data.date}
                  </h3>
                  <p className="font-medium text-slate-600 text-[.65rem] leading-[calc(1/.65)] sm:text-xs">
                    {data.day}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4 bg-white rounded-lg p-6 w-full">
              <div className="flex items-center justify-between font-bold text-lg">
                <h3>Share</h3> <X />
              </div>
              <div className="flex items-center justify-center gap-6">
                <div className="flex flex-col items-center justify-center">
                  <span className="p-2 w-fit bg-black rounded-full">
                    <Code className="bg-black text-white size-4" />
                  </span>
                  <p className="text-[0.55rem] leading-[calc(1/0.45)] text-slate-500">
                    Embed
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <span className="p-2 w-fit bg-green-500 rounded-full">
                    <FaWhatsapp className="fill-white" />
                  </span>
                  <p className="text-[0.55rem] leading-[calc(1/0.45)] text-slate-500">
                    WhatsApp
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <span className="p-2 w-fit bg-blue-800 rounded-full">
                    <FaFacebook className="fill-white" />
                  </span>
                  <p className="text-[0.55rem] leading-[calc(1/0.45)] text-slate-500">
                    Facebook
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <span className="p-2 w-fit bg-blue-500 rounded-full">
                    <FaTwitter className="fill-white" />
                  </span>
                  <p className="text-[0.55rem] leading-[calc(1/0.45)] text-slate-500">
                    Twitter
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <span className="p-2 w-fit bg-gray-500 rounded-full">
                    <MdOutlineEmail className="fill-white" />
                  </span>
                  <p className="text-[0.55rem] leading-[calc(1/0.45)] text-slate-500">
                    Email
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-end justify-center">
                <div className="flex flex-col gap-2 w-full">
                  <h3 className="text-xs font-bold text-slate-800">
                    Share this link
                  </h3>
                  <Input
                    readOnly
                    value={"https://www.example.com/lorem_ipsu"}
                    disabled
                    className="text-gray-400 bg-slate-100 truncate text-[95%]"
                  />
                </div>
                <Button>Copy</Button>
              </div>
            </div>
          </div>
          <div className="flex sm:hidden lg:flex flex-col justify-between gap-4 bg-white h-79 w-full sm:w-auto rounded-lg mt-4 p-6">
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-lg">Set time</h3>
              <div className="w-full h-px bg-slate-200" />
            </div>
            <TimePicker />
            <div className="flex flex-col gap-4">
              <div className="w-full h-px bg-slate-200" />
              <div className="flex justify-end gap-2">
                <Button variant="ghost">Cancel</Button>
                <Button>Set</Button>
              </div>
            </div>
          </div>
          <div className="hidden sm:flex lg:hidden items-center justify-between w-full gap-4">
            <div className="flex flex-col items-center justify-center w-full">
              <div className="flex gap-2 py-4">
                {[
                  { date: "17", day: "Mon" },
                  { date: "18", day: "Tue" },
                  { date: "19", day: "Wed" },
                  { date: "20", day: "Thu" },
                  { date: "21", day: "Fri" },
                ].map((data, i) => (
                  <div
                    className={cn(
                      "flex flex-col items-center justify-center py-4 px-6 rounded-lg h-20 w-20 cursor-pointer select-none",
                      data.date === selectedDate?.date
                        ? "ring-2 ring-indigo-600 ring-inset"
                        : "bg-white"
                    )}
                    key={i}
                    onClick={() => setSelectedDate(data)}
                  >
                    <h3
                      className={cn(
                        "font-medium text-lg",
                        data.date === selectedDate?.date && "text-indigo-600"
                      )}
                    >
                      {data.date}
                    </h3>
                    <p className="font-medium text-slate-600 text-xs">
                      {data.day}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-4 bg-white rounded-lg p-6 w-full">
                <div className="flex items-center justify-between font-bold text-lg">
                  <h3>Share</h3> <X />
                </div>
                <div className="flex items-center justify-center gap-6">
                  <div className="flex flex-col items-center justify-center">
                    <span className="p-2 w-fit bg-black rounded-full">
                      <Code className="bg-black text-white size-4" />
                    </span>
                    <p className="text-[0.55rem] leading-[calc(1/0.45)] text-slate-500">
                      Embed
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <span className="p-2 w-fit bg-green-500 rounded-full">
                      <FaWhatsapp className="fill-white" />
                    </span>
                    <p className="text-[0.55rem] leading-[calc(1/0.45)] text-slate-500">
                      WhatsApp
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <span className="p-2 w-fit bg-blue-800 rounded-full">
                      <FaFacebook className="fill-white" />
                    </span>
                    <p className="text-[0.55rem] leading-[calc(1/0.45)] text-slate-500">
                      Facebook
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <span className="p-2 w-fit bg-blue-500 rounded-full">
                      <FaTwitter className="fill-white" />
                    </span>
                    <p className="text-[0.55rem] leading-[calc(1/0.45)] text-slate-500">
                      Twitter
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <span className="p-2 w-fit bg-gray-500 rounded-full">
                      <MdOutlineEmail className="fill-white" />
                    </span>
                    <p className="text-[0.55rem] leading-[calc(1/0.45)] text-slate-500">
                      Email
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 items-end justify-center">
                  <div className="flex flex-col gap-2 w-full">
                    <h3 className="text-xs font-bold text-slate-800">
                      Share this link
                    </h3>
                    <Input
                      readOnly
                      value={"https://www.example.com/lorem_ipsu"}
                      disabled
                      className="text-gray-400 bg-slate-100 truncate text-[95%]"
                    />
                  </div>
                  <Button>Copy</Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-4 bg-white h-79 w-full sm:w-auto rounded-lg mt-4 p-6">
              <div className="flex flex-col gap-4">
                <h3 className="font-bold text-lg">Set time</h3>
                <div className="w-full h-px bg-slate-200" />
              </div>
              <TimePicker />
              <div className="flex flex-col gap-4">
                <div className="w-full h-px bg-slate-200" />
                <div className="flex justify-end gap-2">
                  <Button variant="ghost">Cancel</Button>
                  <Button>Set</Button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4 bg-white flex-1 h-79 w-full rounded-lg mt-4 p-6">
            <div className="flex items-center justify-between font-bold text-lg">
              Invite Friends <X />
            </div>
            <div className="flex items-center justify-center">
              <Input
                className="rounded-tr-none rounded-br-none bg-slate-50 placeholder:text-slate-300 border-0"
                placeholder="Enter name or email"
              />
              <Button className="rounded-tl-none rounded-bl-none px-6">
                Invite
              </Button>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center justify-center gap-2">
                <Image
                  src="/default-user.svg"
                  height={35}
                  width={35}
                  alt="user icon"
                />
                <div>
                  <h3 className="text-sm font-bold">User Name</h3>
                  <p className="text-xs text-slate-400">
                    email.example@gmail.com
                  </p>
                </div>
              </div>
              <p className="text-xs text-indigo-400 italic">+ Plus</p>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center justify-center gap-2">
                <span className="p-2">
                  <LockKeyhole className="size-4 sm:size-5 text-slate-400" />
                </span>
                <p className="text-xs xl:text-sm">
                  Only people invited to this movie
                </p>
              </div>
              <Select defaultValue="view">
                <SelectTrigger className="bg-background text-xs xl:text-sm">
                  <SelectValue className="placeholder:text-black" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Permission</SelectLabel>
                    <SelectItem value="view">Can view</SelectItem>
                    <SelectItem value="mic">Mic</SelectItem>
                    <SelectItem value="chat">Chat</SelectItem>
                    <SelectItem value="mic & chat">Mic & Chat</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center justify-center gap-2">
                <span className="p-2">
                  <FaEarthAmericas className="size-4 sm:size-5 text-slate-400" />
                </span>
                <p className="text-xs xl:text-sm">
                  <span className="font-bold">Anyone</span> with the link
                </p>
              </div>
              <Select defaultValue="view">
                <SelectTrigger className="bg-background text-xs xl:text-sm">
                  <SelectValue className="placeholder:text-black" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Permission</SelectLabel>
                    <SelectItem value="view">Can view</SelectItem>
                    <SelectItem value="mic">Mic</SelectItem>
                    <SelectItem value="chat">Chat</SelectItem>
                    <SelectItem value="mic & chat">Mic & Chat</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="bg-white !border-0 select-none">
              <TableHead className="invisible">fsafsdf</TableHead>
              <TableHead className="uppercase text-slate-500 font-medium text-sm py-4">
                Name
              </TableHead>
              <TableHead className="uppercase text-slate-500 font-medium text-sm">
                Email
              </TableHead>
              <TableHead className="uppercase text-slate-500 font-medium text-sm">
                Role
              </TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, i) => (
              <TableRow
                key={i}
                className={cn(
                  i % 2 === 0
                    ? "bg-slate-50 hover:bg-slate-50"
                    : "bg-white hover:bg-white"
                )}
              >
                <TableCell className="select-none pl-4 inline-flex justify-center items-center">
                  <Image
                    src={user.image}
                    alt={user.name}
                    width={35}
                    height={35}
                    className="rounded-full"
                  />
                </TableCell>
                <TableCell className="font-bold">{user.name}</TableCell>
                <TableCell className="text-xs truncate">{user.email}</TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium w-16 justify-center select-none",
                      getRoleBadgeStyles(user.role)
                    )}
                  >
                    {user.role}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors bg-transparent hover:bg-transparent shadow-none cursor-pointer select-none">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </MaxWidthWrapper>
    </main>
  );
};

export default Page;
