import React from "react";

import { ClerkProvider } from "@clerk/nextjs";

type Props = {
  children: React.ReactNode;
};

export default function PlatformLayout({ children }: Props) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
