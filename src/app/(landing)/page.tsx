"use client";

import Iphone15Pro from "@/components/magicui/iphone-15-pro";
import { MorphingText } from "@/components/magicui/morphing-text";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { TextAnimate } from "@/components/magicui/text-animate";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Check,
  CircleCheckBig,
  Clapperboard,
  EyeOff,
  Fullscreen,
  Leaf,
  Monitor,
  Play,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Page = () => {
  const brandName = "telenova";
  const [isAnnual, setIsAnnual] = useState(false);
  return (
    <>
      <section id="home" className="relative h-[90dvh]">
        <MaxWidthWrapper>
          <div className="relative flex flex-col items-center gap-10">
            <h1 className="flex flex-col items-center gap-4 text-center uppercase font-bold text-4xl sm:text-6xl lg:text-7xl w-[70%] lg:w-[60%] text-pretty pt-4 sm:pt-15 lg:pt-4">
              <TextAnimate
                className="text-indigo-600"
                by="character"
                duration={1}
                once
              >
                {brandName}
              </TextAnimate>{" "}
              <TextAnimate
                by="character"
                once
                className="text-pretty text-2xl sm:text-4xl lg:text-5xl"
              >
                Your Movies, Your Control, Watch Together.
              </TextAnimate>
            </h1>
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="text-slate-400 uppercase flex items-center gap-2 font-semibold text-xs">
                <TextAnimate by="character" once>
                  end-to-end
                </TextAnimate>
                <div className="bg-indigo-600 h-1 w-1 rounded-full" />
                <TextAnimate by="character" once>
                  encrypted
                </TextAnimate>
              </div>
              <div className="flex items-center gap-4">
                <Link href="/dashboard">
                  <ShinyButton className="w-fit bg-indigo-600 font-bold">
                    <Play className="size-4" />
                    Watch now
                  </ShinyButton>
                </Link>
                <Link href="#plans">
                  <Button
                    variant={"outline"}
                    className="bg-transparent uppercase cursor-pointer"
                  >
                    More info
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
        <div className="relative -mt-15 sm:-mt-20 lg:-mt-10 xl:mt-2 bottom-0 sm:w-[70%] lg:w-[60%] h-[50%] sm:h-[70%] lg:h-[60%] mx-2 sm:mx-auto my-4 sm:my-0">
          <Iphone15Pro
            horizontal
            className="absolute rotat-90 sm:rotate-0 bottom-0 size-full"
            videoSrc="/landing-page-video.mp4"
          />
        </div>
      </section>
      <section
        id="get-app"
        className="sm:min-h-[90dvh] pb-10 sm:pb-0 flex items-start sm:items-center justify-center -mt-50 sm:-mt-0"
      >
        <MaxWidthWrapper className="flex flex-col items-center justify-center gap-20 sm:gap-10 lg:gap-20 pt-20 sm:pt-0">
          <MorphingText
            texts={[
              "Download our app from the store",
              "Scan the QR code to get started instantly!",
            ]}
            className="h-2 text-2xl sm:text-4xl lg:text-5xl"
          />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <img src="/app-qr.svg" alt="App QR code" className="h-80 w-80" />
            <div className="flex sm:flex-col items-center justify-center gap-4 w-full">
              <Button>Play store</Button>
              <Button>App store</Button>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
      <section id="plans" className="min-h-[100dvh]">
        <MaxWidthWrapper
          className="flex flex-col items-center justify-center gap-8
         pt-30 text-center"
        >
          <h3 className="font-medium text-2xl text-indigo-600">Plans</h3>
          <div className="flex flex-col items-center justify-center gap-4">
            <h2 className="font-semibold text-4xl sm:text-5xl lg:text-7xl sm:w-[70%]">
              Security. Privacy. Freedom. For Everyone.
            </h2>
            <p className="text-slate-400 text-sm lg:text-lg">
              Go <span className="text-indigo-600">Plus</span> to unlock
              unlimited streams.
            </p>
            <div className="flex items-center justify-center gap-6 text-xs text-slate-600 select-none">
              <span className="flex items-center justify-center gap-2">
                <Clapperboard className="size-3" />
                Your movies
              </span>
              <span className="flex items-center justify-center gap-2">
                <Fullscreen className="size-3" />
                Your control
              </span>
              <span className="flex items-center justify-center gap-2">
                <EyeOff className="size-3" />
                100% privacy
              </span>
            </div>
          </div>
          <div className="relative flex items-center gap-8 px-4 py-2 text-white text-sm font-medium cursor-pointer bg-green-600 rounded-3xl z-10 select-none">
            <div
              className={cn(
                "absolute left-0.5 transition-all ease-in-out duration-300 w-1/2 h-[90%] bg-white rounded-3xl z-0",
                isAnnual ? "translate-x-[96%]" : "-translate-x-0"
              )}
            />
            <span
              className={cn(
                "z-10 transition-colors duration-300",
                !isAnnual ? "text-slate-600 ease-linear" : null
              )}
              onClick={() => setIsAnnual(false)}
            >
              Monthly
            </span>
            <span
              className={cn(
                "z-10 transition-colors duration-300 ease-linear",
                isAnnual ? "text-slate-600" : null
              )}
              onClick={() => setIsAnnual(true)}
            >
              Annually
            </span>
          </div>

          <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-4 py-10">
            {[
              {
                name: "Free Plan",
                description: "Great for light streaming.",
                features: [
                  "Stream up to 2 movies per month",
                  "Short video support (up to 500MB)",
                  "Watch movies in perfect sync with friends",
                  "End-to-end encrypted streaming",
                  "Create private lobbies to watch together",
                ],
                price: {
                  monthly: "0.00",
                  annual: "0.00",
                },
                buttonText: "Continue with free",
                type: "FREE",
              },
              {
                name: "Plus",
                description: "Stream freely, no caps, no compromise.",
                features: [
                  "Unlimited movie streaming",
                  "No limit on video upload size",
                  "Watch movies in perfect sync with friends",
                  "End-to-end encrypted streaming",
                  "Create private lobbies to watch together",
                ],
                price: {
                  monthly: 14.99,
                  annual: 29.99,
                },
                buttonText: "Upgrade to plus",
                type: "PLUS",
              },
            ].map((plan, key) => (
              <div className="relative" key={key}>
                {plan.type === "PLUS" && (
                  <div className="absolute top-6 -right-[0.8rem] h-8 w-8 bg-green-600 -skew-y-20 z-0" />
                )}
                <div
                  className={cn(
                    "relative flex flex-col items-start gap-8 p-4 rounded-sm z-20 bg-white",
                    plan.type === "PLUS"
                      ? "border-indigo-600 border-2"
                      : "border-slate-300 border-[0.5px]"
                  )}
                >
                  {plan.type === "PLUS" ? (
                    <div className="absolute top-4 -right-4 flex items-center justify-center gap-2 bg-green-600 text-white font-medium text-xs px-4 py-2 rounded-tl-lg rounded-bl-lg select-none z-10">
                      <Star className="size-3" />
                      BEST OFFER
                    </div>
                  ) : null}
                  {plan.type === "PLUS" ? (
                    <div className="bg-indigo-600 p-1.5 rounded-full">
                      <Monitor className="size-4 fill-indigo-600 text-white" />
                    </div>
                  ) : (
                    <Leaf className="size-4" />
                  )}
                  <div className="flex flex-col items-start w-[90%]">
                    <h2
                      className={cn(
                        "font-semibold",
                        plan.type === "PLUS" ? "text-indigo-600" : null
                      )}
                    >
                      {plan.name}
                    </h2>
                    <p className="text-xs text-slate-500">{plan.description}</p>
                  </div>
                  <ul className="flex flex-col items-start gap-3 text-xs font-medium text-slate-700 w-[90%] text-start">
                    {plan.features.map((item, i) => (
                      <li
                        className="flex items-start justify-center gap-2"
                        key={i}
                      >
                        {plan.type === "PLUS" ? (
                          <CircleCheckBig
                            className={cn(
                              "size-4",
                              i < 2 ? "text-indigo-600" : "text-green-600"
                            )}
                          />
                        ) : (
                          <Check className="size-4 text-green-600" />
                        )}
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-10 mx-auto w-[90%] border-b-[0.5px] border-slate-300" />
                  <div className="flex items-center justify-center gap-6 text-sm text-slate-400 w-[90%]">
                    {plan.type === "PLUS" &&
                    typeof plan.price.annual === "number" &&
                    typeof plan.price.monthly === "number" ? (
                      <div>
                        <span className="text-3xl font-semibold text-indigo-600">
                          $
                        </span>
                        <NumberTicker
                          className="text-3xl font-semibold text-indigo-600"
                          value={
                            isAnnual ? plan.price.annual : plan.price.monthly
                          }
                          decimalPlaces={2}
                        />
                      </div>
                    ) : (
                      <span className="text-3xl font-semibold text-black">
                        ${isAnnual ? plan.price.annual : plan.price.monthly}
                      </span>
                    )}{" "}
                    <span>{isAnnual ? "/ year" : "/ month"}</span>
                  </div>
                  <Button
                    className={cn(
                      "w-[90%] mx-auto text-xs cursor-pointer",
                      plan.type !== "PLUS"
                        ? "bg-slate-100 hover:bg-slate-200/90 text-slate-700"
                        : null
                    )}
                  >
                    {plan.buttonText} <ArrowRight className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
};

export default Page;
