import { Meteors } from "@/components/magicui/meteors";
import { TextAnimate } from "@/components/magicui/text-animate";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <main className="bg-black">
      <MaxWidthWrapper className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-4 py-24 text-center gap-4">
        <Meteors number={20} />

        <TextAnimate
          animation="blurInUp"
          by="word"
          once
          className="text-5xl font-bold tracking-tight text-slate-100 md:text-7xl text-pretty"
        >
          404 Page Not Found
        </TextAnimate>

        <TextAnimate
          animation="blurInUp"
          delay={0.3}
          by="character"
          once
          className="max-w-2xl text-sm text-slate-400 md:text-xl"
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved
        </TextAnimate>

        <TextAnimate
          animation="blurInUp"
          delay={0.6}
          by="word"
          once
          className="text-slate-400 text-xs"
        >
          Click below to return to the homepage
        </TextAnimate>

        <Button
          asChild
          size="lg"
          className="mt-6 bg-white text-black hover:bg-gray-200"
        >
          <Link href="/">Return Home</Link>
        </Button>
      </MaxWidthWrapper>
    </main>
  );
};

export default NotFound;
