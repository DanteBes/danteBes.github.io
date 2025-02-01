import NavBar from "../nav-bar/NavBar";
import { useEffect, useState } from "react";
import { VerticalNavBar } from "../vertical-nav-bar/VerticalNavBar";

export function Bar() {

  useEffect(() => {
    console.log(window.innerWidth);
  }, [window.innerWidth]);

  if (window.innerWidth <= 510) {
    return <VerticalNavBar/>;
  } else {
    return <NavBar />;
  }
}
