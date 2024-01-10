import React from "react";
import Navbar from "./_components/navbar";
import Footer from "./_components/footer";

type Props = {
  children: React.ReactNode;
};

export default function MarketingLayout({ children }: Props) {
  return (
    <div className="h-full bg-white">
      <Navbar />
      <main className="pt-40 pb-20 bg-white">{children}</main>
      <Footer />
    </div>
  );
}
