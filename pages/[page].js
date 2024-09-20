import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Home from "../components/main/home";

import Pricing from "../components/main/pricing";
import IndexMenuWrapper from "./components/index-menu-wrapper";
import About from "../components/main/about";
import APIDoc from "../components/main/api-doc";

export const pages = {
  home: <Home />,
  pricing: <Pricing />,
  about: <About />,
  "api-doc": <APIDoc />,
};

export default function Page() {
  const router = useRouter();
  const [page, setPage] = useState(null);
  useEffect(() => {
    if (router.isReady) {
      const _page = router.query.page;
      setPage(_page);
    }
  }, [router]);

  return <IndexMenuWrapper page={page}>{page && pages[page]}</IndexMenuWrapper>;
}
