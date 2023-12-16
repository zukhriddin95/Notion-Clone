import React, { Fragment } from "react";
import { Button } from "@/components/ui/button";
import Logo from "./logo";

const Footer = () => {
  return (
    <Fragment>
      <div className="flex items-center w-full p-6 bg-background z-50">
        <Logo />

        <div className="md:ml=auto w-full justify-between md:justify-end flex items-center gap-x-2">
          <Button variant={"ghost"} size={"sm"}>
            Privacy Policy
          </Button>
          <Button variant={"ghost"} size={"sm"}>
            Term & Conditions
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default Footer;
