import React from "react";

import Resumes from "../admin/resumes";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import EditResume from "./edit-resume";
import List from "./resume/list";

export default function Resume() {
  const router = useRouter();
  const id = router.query?.id;

  let user = getCookie("user");
  if (user) {
    user = JSON.parse(user);
  }
  return id ? <EditResume /> : <List />;
}
