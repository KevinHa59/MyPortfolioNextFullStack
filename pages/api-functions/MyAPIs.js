import { Auth } from "./MyAPI/Auth";
import { Credential } from "./MyAPI/Credential";
import { General } from "./MyAPI/General";
import { MembershipType } from "./MyAPI/MembershipType";
import { Page } from "./MyAPI/Page";
import { Permission } from "./MyAPI/Permission";
import { Resume } from "./MyAPI/Resume";
import { Status } from "./MyAPI/Status";
import { User } from "./MyAPI/User";

class MyAPIs {
  Auth() {
    return Auth;
  }
  Status() {
    return Status;
  }
  Credential() {
    return Credential;
  }
  Resume() {
    return Resume;
  }
  User() {
    return User;
  }
  MembershipType() {
    return MembershipType;
  }
  Page() {
    return Page;
  }
  Permission() {
    return Permission;
  }
  Generals() {
    return General;
  }
}

export default new MyAPIs();
