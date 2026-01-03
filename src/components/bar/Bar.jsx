import NavBar from "../nav-bar/NavBar";
import { useEffect, useState } from "react";
import { VerticalNavBar } from "../vertical-nav-bar/VerticalNavBar";

export function Bar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 510);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 510);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return <VerticalNavBar />;
  } else {
    return <NavBar />;
  }
}
