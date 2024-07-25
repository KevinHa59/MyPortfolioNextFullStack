import React from "react";

import Resumes from "../admin/resumes";
import { getCookie } from "cookies-next";

export default function Resume() {
  let user = getCookie("user");
  if (user) {
    user = JSON.parse(user);
  }
  return <Resumes defaultUser={user} />;
}
