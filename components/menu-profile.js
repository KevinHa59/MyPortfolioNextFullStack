import {
  ApiRounded,
  Apps,
  Article,
  CodeRounded,
  KeyRounded,
  ManageAccounts,
  Password,
  People,
  PersonRounded,
} from "@mui/icons-material";
import Profile from "./profile/profile";
import Resume from "./profile/resume";
import PortfolioCollection from "./profile/portfolio-collections";
import PasswordChange from "../pages/authentication/password-change";

export const menu_profile = [
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
        Icon: Password,
        title: "Change Password",
        param: "changePassword",
        Comp: <PasswordChange useLoggedInUser={true} />,
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
    sub: [
      {
        Icon: KeyRounded,
        title: "Credential",
        param: "credential",
        // Comp: <Profile />,
      },
      {
        Icon: ApiRounded,
        title: "API Documentation",
        param: "api-documentation",
        // Comp: <PasswordChange useLoggedInUser={true} />,
      },
    ],
  },
];
