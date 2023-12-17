"use client";

import React from "react";
import Logo from "./logo";
import { ModeToggle } from "@/components/shared/mode-toggle";
import { Button } from "@/components/ui/button";
import useScrolled from "@/hooks/use-scroled";
import { cn } from "@/lib/utils";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import Link from "next/link";
import Loader from "@/components/ui/loader"

function Navbar() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrolled();


  return (
    <div
      className={cn(
        "z-50 bg-background fixed top-0 flex items-center w-full p-6 justify-between ease duration-300",
        scrolled && "border-b shadow-sm py-3"
      )}
    >
      <Logo />

      <div className="flex items-center justify-between sm:justify-start gap-x-4">

        {isLoading && <Loader size={"lg"}  />}  

        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button size={"sm"} variant={"ghost"}>
                Login in
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button size={"sm"}>Get Notion Free</Button>
            </SignInButton>
          </>
        )}

        {isAuthenticated && !isLoading && (
          <>
            <Button variant={"ghost"} size={"sm"} asChild>
              <Link href="/documents">Enter Notion</Link>
            </Button>
            <UserButton afterSignOutUrl="/"></UserButton>
          </>
        )}

        <ModeToggle />
      </div>
    </div>
  );
}

export default Navbar;
