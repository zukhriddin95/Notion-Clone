"use client";

import React from "react";
import Logo from "./logo";
import { ModeToggle } from "@/components/shared/mode-toggle";
import { Button } from "@/components/ui/button";
import useScrolled from "@/hooks/use-scroled";
import { cn } from "@/lib/utils";

function Navbar() {
  const scrolled = useScrolled();

  console.log(scrolled);

  return (
    <div
      className={cn(
        "z-50 bg-background fixed top-0 flex items-center w-full p-6 justify-between ease duration-300",
        scrolled && "border-b shadow-sm py-3"
      )}
    >
      <Logo />
      <div className="flex items-center gap-x-4">
        <Button size={"sm"} variant={"ghost"}>
          Login in
        </Button>
        <Button size={"sm"}>Get Notion Free</Button>
        <ModeToggle />
      </div>
    </div>
  );
}

export default Navbar;
