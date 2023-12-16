import { Fragment } from "react";
import Heroes from "./components/heroes";
import Clients from "./components/clients";
import Pricing from "./components/pricing";
import Footer from "./components/footer";

export default function Home() {
  return (
    <Fragment>
      <div className="min-h-full flex flex-col">
        <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
          <Heroes  />
          <Clients  />
        </div>
        <Pricing  />
        <Footer  />
      </div>
    </Fragment>
  );
}
