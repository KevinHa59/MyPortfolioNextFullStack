import { Button, Stack, Typography } from "@mui/material";
import { LogoFull } from "../icons/logo";
import IndexMenuWrapper from "./components/index-menu-wrapper";
import { useRouter } from "next/router";
import { useEffect } from "react";
export default function Index() {
  const router = useRouter();
  useEffect(() => {
    if (router.isReady && router.pathname === "/") {
      router.push("/home");
    }
  }, [router]);
  return null;
}
