import {
  AdminPanelSettings,
  Article,
  BusinessCenter,
  DashboardCustomize,
  Hub,
  ManageAccounts,
  PagesRounded,
  People,
  VerifiedUser,
} from "@mui/icons-material";
import Dashboard from "../../components/admin/dashboard";
import Users from "../../components/admin/users";
import UserTypes from "../../components/admin/user-types";
import Pages from "../../components/admin/pages";
import Permissions from "../../components/admin/permissions";
import Resumes from "../../components/admin/resumes";
import Courses from "../../components/admin/courses";

export const menu_admin = [
  {
    title: "Dashboard",
    param: "dashboard",
    Icon: DashboardCustomize,
    Comp: <Dashboard />,
  },
  {
    title: "User Management",
    Icon: ManageAccounts,
    sub: [
      {
        title: "Users",
        param: "users",
        Icon: People,
        Comp: <Users />,
      },
      {
        title: "User Types",
        param: "userTypes",
        Icon: Hub,
        Comp: <UserTypes />,
      },
    ],
  },
  {
    title: "Access Control",
    param: "accessControl",
    Icon: VerifiedUser,
    sub: [
      {
        title: "Pages",
        param: "pages",
        Icon: PagesRounded,
        Comp: <Pages />,
      },
      {
        title: "Permissions",
        param: "permissions",
        Icon: AdminPanelSettings,
        Comp: <Permissions />,
      },
    ],
  },

  {
    title: "Resumes",
    param: "resumes",
    Icon: Article,
    Comp: <Resumes />,
  },
  {
    title: "Courses",
    param: "courses",
    Icon: BusinessCenter,
    Comp: <Courses />,
  },
];
