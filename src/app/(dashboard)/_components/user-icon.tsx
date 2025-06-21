import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AtSign, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";

export const UserIcon = () => {
  const { data } = useSession();
  const user = data?.user;
  return (
    <>
      {/* TODO: add backend */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Image
            src="/default-user.svg"
            alt="User Icon"
            height={32}
            width={32}
            className="rounded-full object-contain object-center cursor-pointer"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col p-4 mr-6 mt-2">
          <DropdownMenuLabel className="text-md font-semibold">
            Your Info
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-sm font-medium active:bg-white">
            <User className="text-black" />
            {user?.name}
          </DropdownMenuItem>
          <DropdownMenuItem className="text-xs font-medium active:bg-white">
            <AtSign className="text-black" />
            {user?.email}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
