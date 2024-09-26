import { useRouter } from "next/router";
import React, { createContext, useEffect, useState } from "react";
import Home from "../components/main/home";

import Pricing from "../components/main/pricing";
import IndexMenuWrapper from "../components/index-menu-wrapper";
import About from "../components/main/about";
import APIDoc from "../components/main/api-doc";
import { getSession } from "next-auth/react";
import MyAPIs from "./api-functions/MyAPIs";

export const pages = {
  home: <Home />,
  pricing: <Pricing />,
  about: <About />,
  "api-doc": <APIDoc />,
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    console.log("Access Token:", session.accessToken);
  }
  return {
    props: { session },
  };
}

export const homeContext = createContext();

export default function Page() {
  const router = useRouter();
  const [page, setPage] = useState(null);
  const [membership, setMembership] = useState([]);

  useEffect(() => {
    if (router.isReady) {
      init();
      const _page = router.query.page;
      setPage(_page);
    }
  }, [router]);

  const init = async () => {
    const res = await MyAPIs.MembershipType().getMembershipTypes();
    setMembership(res.data);
  };

  return (
    <homeContext.Provider value={{ membership }}>
      <IndexMenuWrapper page={page}>{page && pages[page]}</IndexMenuWrapper>
    </homeContext.Provider>
  );
}
