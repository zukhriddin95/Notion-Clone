import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className=" hidden sm:flex  items-center gap-x-2">
      <Image
        src={"/logo.svg"}
        alt="Logo"
        width={50}
        height={50}
        className="object-cover dark:hidden"
      />
      <Image
        src={"/logo-dark.svg"}
        alt="Logo"
        width={50}
        height={50}
        className="hidden object-cover dark:block"
      />
      <p className="font-semibold text-xl">Notion</p>
    </div>
  );
};

export default Logo;
