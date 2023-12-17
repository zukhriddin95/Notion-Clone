"use client"
import { Button } from "@/components/ui/button";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";
import Image from "next/image";
import React, { Fragment } from "react";
import Link from "next/link";
import Loader from "@/components/ui/loader"



const Heroes = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <Fragment>
      <div className="max-w-3xl space-y-4">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
          Write, Plan, Share. With AI at your side
        </h1>
        <h3>
          Notion is the connected workspace where better, faster work happwens
        </h3>
        
        
        {isLoading && <Loader size={"lg"} />}

        {isAuthenticated && !isLoading && (
          <>
      <Button asChild>
        <Link href='/documents'>Enter Notion <ArrowRight className="h-4 w-4 ml-2" /></Link>
        </Button>
          </>
        )}

{!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button >
              Get Notion Free
              <ArrowRight className="h-4 w-4 ml-2" / >
              </Button>
            </SignInButton>
            
          </>
        )}
       
           
      </div>
      <div className="flex flex-col items-center justify-center max-w-5xl">
        <div className="flex items-center">
          <div className="relative h-[400px] w-[400px] hidden md:block">
            <Image
              src={"/men.svg"}
              alt="men"
              className="object-cover dark:hidden"
              fill
            />
            <Image
              src={"/men-dark.svg"}
              alt="men"
              className="hidden object-cover dark:block"
              fill
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Heroes;
