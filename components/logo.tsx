import Image from "next/image";
import Link from "next/link";
import React from "react";

import localFont from "next/font/local";
import { cn } from "@/lib/utils";

type Props = {};

const headingFont = localFont({
  src: "../public/fonts/font.woff2",
});

export default function Logo({}: Props) {
  return (
    <Link href={"/"}>
      <div className="hover:opacity-75 transition flex items-center gap-x-2">
        <Image src="/logo.svg" alt="Logo" height={30} width={30} />
        <p
          className={cn("text-lg text-neutral-700", headingFont.className)}
        >
          Taskify
        </p>
      </div>
    </Link>
  );
}
