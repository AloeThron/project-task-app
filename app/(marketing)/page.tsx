import React from "react";
import Link from "next/link";

import localFont from "next/font/local"
import {Poppins} from 'next/font/google'
import { Award } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {};

const headingFont = localFont({
  src: "../../public/fonts/font.woff2"
})

const textFont = Poppins({
  subsets: ["latin"],
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900"
  ],
});

export default function MarketingPage({}: Props) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className={cn("flex flex-col items-center justify-center", headingFont.className)}>
        <div className="mb-14 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase">
          <Award className="h-6 w-6 mr-6" /> No.1 Task Management
        </div>
        <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-16">
          Taskify helps team move
        </h1>
        <div className="text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 rounded-md p-4 w-fit">
          Work forward
        </div>
      </div>
      <div className={cn("text-sm md:text-xl text-neutral-400 mt-14 max-w-xs md:max-w-2xl text-center mx-auto", textFont.className)}>
        Collaborate, manage projects, and reach new productivity peaks. From
        high rises to the home office, the way your team works is unique -
        accomplish it all with Taskify.
      </div>
      <Button className="mt-6" size={"lg"} asChild>
        <Link href={"/sign-up"}>Get Taskify for free</Link>
      </Button>
    </div>
  );
}
