import { Button } from "@mui/material";
import { getCookie } from "cookies-next";
import Link from "next/link";
import React from "react";

export default function PortfolioCollection() {
  const handleRoute = () => {
    const user = getCookie("user");
    const userID = JSON.parse(user).id;
    const newTab = window.open(
      "profile/portfolio-collection/preview",
      "_blank"
    );
    const sendData = { userID: userID, style: 1 };
    newTab.onload = () => {
      console.log("New tab loaded, sending data...", sendData);
      newTab.postMessage(sendData, window.location.origin);
    };
  };
  return <Button onClick={handleRoute}>Style 1</Button>;
}
