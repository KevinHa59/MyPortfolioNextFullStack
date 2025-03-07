import {
  ApiRounded,
  Apps,
  Article,
  CardMembership,
  CodeRounded,
  DesignServices,
  Folder,
  KeyRounded,
  ManageAccounts,
  Palette,
  Password,
  People,
  PersonRounded,
  Rule,
} from "@mui/icons-material";
import Profile from "./profile/profile";
import Resume from "./profile/resume";
import PortfolioCollection from "./profile/portfolio-collections";
import PasswordChange from "../pages/authentication/password-change";
import Credential from "./profile/for-dev/credential";
import CORS from "./profile/for-dev/cors";
import Membership from "./profile/membership";
import { useState } from "react";

export const menu_profile = (membership) => {
  const feature = membership?.membershipType?.feature || null;
  const isAPIAccess =
    feature?.isAPIAccess !== undefined ? feature.isAPIAccess : true;

  return [
    {
      title: "Account",
      Icon: ManageAccounts,
      sub: [
        {
          Icon: PersonRounded,
          title: "Profile",
          param: "profile",
          Comp: <Profile />,
        },
        {
          Icon: CardMembership,
          title: "Subscription",
          param: "subscription",
          Comp: <Membership />,
        },
        {
          Icon: Password,
          title: "Change Password",
          param: "changePassword",
          Comp: <PasswordChange />,
        },
      ],
    },
    {
      Icon: Article,
      title: "My Resumes",
      param: "myResumes",
      Comp: <Resume />,
    },
    {
      Icon: Apps,
      title: "My Portfolios",
      param: "myPortfolios",
      Comp: <PortfolioCollection />,
    },
    {
      title: "For Dev",
      Icon: CodeRounded,
      visible: isAPIAccess,
      sub: [
        {
          Icon: KeyRounded,
          title: "Credential",
          param: "credential",
          Comp: <Credential />,
        },
        {
          Icon: Rule,
          title: "CORS",
          param: "cors",
          Comp: <CORS />,
        },
        {
          Icon: ApiRounded,
          title: "API Documentation",
          param: "api-documentation",
          // Comp: <PasswordChange useLoggedInUser={true} />,
        },
      ],
    },
    {
      title: "For Creator",
      Icon: DesignServices,
      visible: isAPIAccess,
      sub: [
        {
          Icon: Folder,
          title: "Your Design",
          param: "your-design",
          Comp: <Credential />,
        },
        {
          Icon: Palette,
          title: "Editor",
          Comp: null,
          path: "/profile/editor",
        },
      ],
    },
  ];
};
