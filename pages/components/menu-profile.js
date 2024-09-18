import { Apps, Article, Password, People } from "@mui/icons-material";
import Profile from "../../components/profile/profile";
import Resume from "../../components/profile/resume";
import PortfolioCollection from "../../components/profile/portfolio-collections";
import PasswordChange from "../authentication/password-change";

export const menu_profile = [
  {
    Icon: People,
    title: "Profile",
    param: "profile",
    Comp: <Profile />,
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
    Icon: Password,
    title: "Change Password",
    param: "changePassword",
    Comp: <PasswordChange useLoggedInUser={true} />,
  },
];
