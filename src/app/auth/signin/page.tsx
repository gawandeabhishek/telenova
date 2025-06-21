import { signIn } from "@/auth";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// TODO: Improve UI of login page

const Page = () => {
  const brandName = "telenova";
  return (
    <main className="select-none">
      <MaxWidthWrapper className="flex py-30 flex-row justify-between">
        <div className="flex flex-col w-1/2 items-center gap-20 z-20">
          <div className="flex items-center justify-center gap-2">
            <span className="-z-1">
              <Image src="/brand.svg" alt={brandName} height={70} width={70} />
            </span>
            <span className="hidden sm:block font-semibold capitalize text-5xl">
              {brandName}
            </span>
          </div>
          <div className="flex flex-col justify-center gap-4">
            <h1 className="text-5xl font-semibold">Welcome Back!</h1>
            <p className="text-sm">
              Enter to watch movies together with your friends.
            </p>
          </div>
          <div className="flex flex-col w-1/2 gap-6">
            <div className="w-full border-1" />
            <Button
              className="rounded-full"
              onClick={async () => {
                "use server";
                await signIn("google", { redirectTo: "/dashboard" });
              }}
            >
              Login with Google
            </Button>
          </div>
        </div>
        <div className="relative flex flex-col w-[40%] h-[70dvh]">
          <Image
            src="/login-page-banner.jpg"
            alt="Login Page Banner"
            className="absolute rounded-xl"
            fill
          ></Image>
        </div>
      </MaxWidthWrapper>
    </main>
  );
};

export default Page;
