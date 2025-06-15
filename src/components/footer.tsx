import { Copyright, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  const brandName = "telenova";
  return (
    <footer className="flex flex-col items-center justify-center gap-8 py-10">
      <div className="w-[90%] border-[0.5px] border-slate-100" />
      <div className="flex items-center justify-center gap-4">
        <Link
          href="https://www.youtube.com/channel/UCFNUxn4pA6kB_7MbMa1_OgQ"
          target="_blank"
        >
          <Youtube className="size-6" />
        </Link>
        <Twitter className="size-6 fill-black text-white" />
        <div className="bg-black p-1 rounded-full">
          <Facebook className="size-3.5 fill-white" />
        </div>
        <Instagram className="size-6 fill-black text-white" />
      </div>

      <div className="flex flex-col gap-2">
        <p className="flex items-center justify-center text-sm gap-1">
          <Copyright className="size-3" /> {brandName}, LLC. All rights reserved
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:text-xl font-medium text-slate-700">
          <span>Privacy</span>
          <span>Terms & Conditions</span>
          <span>Help</span>
        </div>
      </div>
    </footer>
  );
};
