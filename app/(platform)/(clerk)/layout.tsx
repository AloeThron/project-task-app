import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function ClerkLayout({ children }: Props) {
  return (
    <div className="h-full flex items-center justify-center">{children}</div>
  );
}
