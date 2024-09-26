import {
  AdminPanelSettings,
  AllInbox,
  Article,
  BusinessCenter,
  CardMembership,
  DashboardCustomize,
  Hub,
  Inventory,
  ManageAccounts,
  PagesRounded,
  People,
  Style,
  VerifiedUser,
} from "@mui/icons-material";
import Dashboard from "./admin/dashboard";
import Users from "./admin/users";
import UserTypes from "./admin/user-types";
import Pages from "./admin/pages";
import Permissions from "./admin/permissions";
import Resumes from "./admin/resumes";
import Courses from "./admin/courses";
import Status from "./admin/status";
import MembershipTypes from "./admin/membership-types";

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
    title: "Membership Control",
    param: "membershipControl",
    Icon: CardMembership,
    sub: [
      {
        title: "Membership Types",
        param: "membershipTypes",
        Icon: AllInbox,
        Comp: <MembershipTypes />,
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
    title: "General Data",
    param: "generalData",
    Icon: Inventory,
    sub: [
      {
        title: "Courses",
        param: "courses",
        Icon: BusinessCenter,
        Comp: <Courses />,
      },
      {
        title: "Status",
        param: "status",
        Icon: Style,
        Comp: <Status />,
      },
    ],
  },
];
