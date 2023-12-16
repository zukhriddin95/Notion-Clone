"use client"

import { useEffect, useState } from "react";

const useScrolled = () => {
  const [scolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScrolled = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScrolled);
    return () => window.removeEventListener("scroll", handleScrolled);
  }, []);

  return scolled;
};

export default useScrolled;
