import {
  Button,
  Chip,
  Divider,
  Fade,
  Grid,
  IconButton,
  LinearProgress,
  Paper,
  Slide,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import ButtonDialog from "../widgets/buttons/button_dialog";
import UsersAPI from "../../pages/api-functions/UsersAPI";
import {
  Clear,
  CopyAll,
  DateRange,
  Delete,
  DeleteForever,
  Edit,
  Email,
  Label,
  Password,
  People,
  Remove,
  Token,
} from "@mui/icons-material";
import FormHeader from "../widgets/texts/form-header";
import ErrorRenderer from "../widgets/texts/error-renderer";
import LoadingComponent from "../widgets/loading/loading-component";
import SelectCustom from "../widgets/select/select-custom";
import Table from "../widgets/tables/table";
import Input from "../widgets/input/Input";
import jwt from "../../utils/jwtUtil";
import MyAPIs from "../../pages/api-functions/MyAPIs";
import { styles } from "../../styles/useStyle";
import Header from "./header";
import PaperForm from "../widgets/paper/paper-form";
import ButtonLoading from "../widgets/buttons/button-loading";
import LabelText from "../widgets/texts/label-text";
import { mainContext } from "../../pages/_app";
import ButtonDialogConfirm from "../widgets/buttons/button_dialog_confirm";
import { asyncNoteContext } from "../widgets/notification/async-notification";

export default function Users() {
  const { addNote } = useContext(asyncNoteContext);
  const [users, setUsers] = useState([]);
  const [userTypes, setUserTypes] = useState([]);
  const [isGettingData, setIsGettingData] = useState(true);
  const [isNewUserOpen, setIsNewUserOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  useEffect(() => {
    initData();
    getAllUserTypes();
  }, []);

  async function initData() {
    setIsGettingData(true);
    let data = await addNote("Get Users", MyAPIs.User().getUsers());
    data = data.data?.map((user) => {
      const _userType = { ...user.userType };
      return {
        ...user,
        userType: _userType.type,
        userTypeColor: _userType.color,
      };
    });
    setUsers(data);
    setIsGettingData(false);
  }

  async function getAllUserTypes() {
    const res = await addNote("Get User Types", MyAPIs.User().getUserTypes());
    setUserTypes(res);
  }

  const handleEditUserOpen = (user) => {
    setEditUser(user);
    setIsNewUserOpen(true);
  };

  return (
    <Stack width={"100%"} height={"100%"} gap={"1px"}>
      <Header title={"User"} icon={<People />}>
        <Stack direction={"row"} gap={1}>
          <ButtonDialog
            open={isNewUserOpen}
            isCloseOnClickOut={false}
            onClick={() => setIsNewUserOpen(true)}
            variant={"contained"}
            button_label="Create New User"
            size="small"
            title={editUser ? "Edit User" : "New User"}
            onClose={() => {
              setIsNewUserOpen(false);
              setTimeout(() => {
                setEditUser(null);
              }, 200);
            }}
          >
            <NewUser
              userTypes={userTypes}
              value={editUser}
              onClose={() => {
                setIsNewUserOpen(false);
                setTimeout(() => {
                  setEditUser(null);
                }, 200);
              }}
              onCreateUserSuccess={() => {
                initData();
                setIsNewUserOpen(false);
              }}
            />
          </ButtonDialog>
        </Stack>
      </Header>
      <Stack
        sx={{
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Paper className="flat br0">
          <Table
            isLoading={isGettingData}
            data={users}
            headers={headers}
            callback_cell={(row, key) => (
              <Cell
                row={row}
                header={key}
                onEdit={() => handleEditUserOpen(row)}
                onPasswordChange={() => handlePasswordChangeOpen(row)}
                onRefresh={initData}
              />
            )}
          />
        </Paper>
      </Stack>
    </Stack>
  );
}
function Cell({ row, header, onEdit, onRefresh }) {
  if (header === "userType") {
    return (
      <Chip
        size="small"
        label={`${row[header]}`}
        sx={{ background: row["userTypeColor"], fontWeight: "bold" }}
      />
    );
  } else if (header === "dob") {
    return row["dob"]
      ? new Date(
          row["dob"]?.split("T")[0] + "T05:00:00.000Z"
        ).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "N/A";
  } else if (header === "actions") {
    const handleRemoveUser = async () => {
      const res = await MyAPIs.User().removeUserByID(row["id"]);
      onRemoveSuccess && onRemoveSuccess();
    };
    return (
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"flex-end"}
        gap={"1px"}
      >
        <IconButton
          sx={{ borderRadius: "20px", paddingY: 0 }}
          variant="contained"
          size="small"
          color="warning"
          onClick={onEdit}
        >
          <Edit />
        </IconButton>
        <PasswordChangeButton user={row} />
        <TokenButton user={row} onRefresh={onRefresh} />
        <ButtonDialogConfirm
          sx={{ borderRadius: "20px", padding: 0, minWidth: 0 }}
          size="small"
          dialog_title={"Delete User"}
          dialog_message={"Are You Sure?"}
          dialog_color="error"
          color={"error"}
          onConfirm={() => handleRemoveUser()}
        >
          <DeleteForever color="error" />
        </ButtonDialogConfirm>
      </Stack>
    );
  } else return row[header];
}

const headers = [
  {
    name: "First Name",
    key: "firstName",
    xs: 2,
  },
  {
    name: "Last Name",
    key: "lastName",
    xs: 2,
  },
  {
    name: "Email",
    key: "email",
    xs: 3,
  },
  {
    name: "Date of Birth",
    key: "dob",
    xs: 2,
  },
  {
    name: "User Type",
    key: "userType",
    xs: 1,
    align: "center",
  },
  {
    name: "",
    key: "actions",
    xs: 2,
    align: "right",
  },
];

const temp_user = {
  email: "",
  confirmEmail: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
  dob: "",
  userTypeID: "",
};

function NewUser({ value = null, userTypes, onClose, onCreateUserSuccess }) {
  const [input, setInput] = useState(null);
  const [inputErrors, setInputErrors] = useState([]);
  const [isCreatingUser, setIsCreatingUser] = useState(false);

  useEffect(() => {
    if (value !== null) {
      const userInfo = {
        ...value,
        password: jwt.verifyToken(value.password)?.password || "",
      };
      setInput(userInfo);
    } else {
      setInput(temp_user);
    }
  }, [value]);
  const handleInputChange = (newValue) => {
    setInput((prev) => {
      return {
        ...prev,
        ...newValue,
      };
    });
  };

  const handleCreateAccount = async () => {
    setIsCreatingUser(true);
    const errors = verifyNewUser(
      input?.email,
      input?.confirmEmail,
      input?.password,
      input?.confirmPassword,
      input?.firstName,
      input?.lastName,
      input?.dob,
      input?.userTypeID
    );
    setInputErrors(errors);
    if (errors.length === 0) {
      const res = await MyAPIs.User().createUser(
        input?.email,
        input?.firstName,
        input?.lastName,
        input?.dob,
        input?.password,
        input?.userTypeID
      );
      onCreateUserSuccess && onCreateUserSuccess();
    }
    setIsCreatingUser(false);
  };
  return (
    <Stack gap={2} width={"100%"} padding={2}>
      <Stack gap={1} paddingX={2}>
        <Stack direction={"row"} gap={1}>
          <Input
            value={input?.firstName}
            onChange={(e) => handleInputChange({ firstName: e.target.value })}
            autoComplete="off"
            size="small"
            label="First Name"
          />
          <Input
            value={input?.lastName}
            onChange={(e) => handleInputChange({ lastName: e.target.value })}
            autoComplete="off"
            size="small"
            label="Last Name"
          />
        </Stack>
        <Stack direction={"row"} gap={1}>
          <Input
            InputProps={{
              startAdornment: <DateRange sx={{ paddingRight: 1 }} />,
            }}
            value={input?.dob.split("T")[0]}
            onChange={(e) => handleInputChange({ dob: e.target.value })}
            autoComplete="off"
            size="small"
            type="date"
            label="Date of Birth"
          />
          <SelectCustom
            label={"User Type"}
            data={userTypes}
            selected_value={input?.userTypeID}
            item_field={"type"}
            value_field={"id"}
            size="small"
            sx={{ width: "100%" }}
            onChange={(value) => handleInputChange({ userTypeID: value })}
          />
        </Stack>
      </Stack>
      {value === null && (
        <>
          <Divider />
          <Stack gap={1} paddingX={2}>
            <Input
              value={input?.email}
              onChange={(e) => handleInputChange({ email: e.target.value })}
              type="email"
              InputProps={{
                startAdornment: <Email sx={{ paddingRight: 1 }} />,
              }}
              autoComplete="off"
              size="small"
              label="Email"
            />
            <Input
              value={input?.confirmEmail}
              onChange={(e) =>
                handleInputChange({ confirmEmail: e.target.value })
              }
              type="email"
              InputProps={{
                startAdornment: <Email sx={{ paddingRight: 1 }} />,
              }}
              autoComplete="off"
              size="small"
              label="Confirm Email"
            />
          </Stack>
          <Divider />
          <Stack gap={1} paddingX={2}>
            <Input
              value={input?.password}
              onChange={(e) => handleInputChange({ password: e.target.value })}
              type="password"
              InputProps={{
                startAdornment: <Password sx={{ paddingRight: 1 }} />,
              }}
              autoComplete="off"
              size="small"
              label="Password"
            />
            <Input
              value={input?.confirmPassword}
              onChange={(e) =>
                handleInputChange({ confirmPassword: e.target.value })
              }
              type="password"
              InputProps={{
                startAdornment: <Password sx={{ paddingRight: 1 }} />,
              }}
              autoComplete="off"
              size="small"
              label="Confirm Password"
            />
          </Stack>
        </>
      )}
      <ErrorRenderer errors={inputErrors} />
      <Divider />
      <Stack direction={"row"} justifyContent={"flex-end"} gap={1} paddingX={2}>
        <Button variant="contained" size="small" onClick={handleCreateAccount}>
          Save
        </Button>
      </Stack>
    </Stack>
  );
}

const password_temp = {
  currentPassword: "",
  password: "",
  confirmPassword: "",
};

function PasswordChangeButton({ user }) {
  const [open, setOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [errors, setErrors] = useState([]);
  const [input, setInput] = useState(password_temp);

  const handleInputChange = (newValue) => {
    setInput((prev) => {
      return {
        ...prev,
        ...newValue,
      };
    });
  };

  const handleUpdatePassword = async () => {
    const _errors = [];
    setIsUpdating(true);
    const verifyPassword = await MyAPIs.User().login(
      user.email,
      input.currentPassword
    );
    if (verifyPassword.data !== undefined) {
      if (input.password.length < 8) {
        _errors.push("Password must contains at least 8 characters");
      }
      if (input.password !== input.confirmPassword) {
        _errors.push("Passwords not matched");
      }

      if (_errors.length === 0) {
        const res = await MyAPIs.User().updatePassword(
          user.email,
          input.password
        );
        setOpen(false);
        setInput(password_temp);
      }
    } else {
      _errors.push("Invalid Password");
    }
    setErrors(_errors);
    setIsUpdating(false);
  };

  return (
    <ButtonDialog
      isIconButton={true}
      size="small"
      color={"info"}
      icon={<Password />}
      open={open}
      isCloseOnClickOut={false}
      onClick={() => setOpen(true)}
      title={"Edit Password"}
      onClose={() => {
        setOpen(false);
        setInput(password_temp);
        setErrors([]);
      }}
    >
      <Stack gap={1} minWidth={"400px"}>
        <Stack padding={2} gap={1}>
          <LabelText label={"Email"}>{user.email}</LabelText>
          <Input
            type={"password"}
            value={input.currentPassword}
            label={"Current Password"}
            size="small"
            onChange={(e) =>
              handleInputChange({ currentPassword: e.target.value })
            }
          />
          <Divider />
          <Input
            type={"password"}
            value={input.password}
            label={"New Password"}
            size="small"
            onChange={(e) => handleInputChange({ password: e.target.value })}
          />
          <Input
            type={"password"}
            value={input.confirmPassword}
            label={"Confirm New Password"}
            size="small"
            onChange={(e) =>
              handleInputChange({ confirmPassword: e.target.value })
            }
          />
          <ErrorRenderer errors={errors} />
        </Stack>

        <Divider />
        <Stack
          direction={"row"}
          justifyContent={"flex-end"}
          gap={"1px"}
          padding={2}
        >
          <ButtonLoading
            variant={"contained"}
            isLoading={isUpdating}
            size="small"
            onClick={handleUpdatePassword}
          >
            Confirm
          </ButtonLoading>
        </Stack>
      </Stack>
    </ButtonDialog>
  );
}

function TokenButton({ user, onRefresh }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerateToken, setIsGenerateToken] = useState(false);
  const { setNote } = useContext(mainContext);
  const handleCreateToken = async () => {
    setIsGenerateToken(true);
    const res = await MyAPIs.User().generateToken(user.email);

    if (res.data !== undefined) {
      onRefresh && onRefresh();
    }
    setIsGenerateToken(false);
  };
  const handleCopy = (message, token) => {
    navigator.clipboard.writeText(token);
    setNote.success(message);
  };

  return (
    <ButtonDialog
      isIconButton={true}
      icon={<Token />}
      size="small"
      color={"secondary"}
      open={isOpen}
      isCloseOnClickOut={false}
      onClick={() => setIsOpen(true)}
      paperProps={{
        style: {
          width: "clamp(400px, 100%, 600px)",
          maxWidth: "100%",
        },
      }}
      title={"User Token"}
      onClose={() => setIsOpen(false)}
    >
      <Stack padding={2} gap={1} width={"100%"}>
        <LabelText label={"Email"}>{user.email}</LabelText>
        {user.refreshToken === null ? (
          <ButtonLoading
            isLoading={isGenerateToken}
            onClick={handleCreateToken}
            variant="contained"
            size="small"
          >
            Create Refresh and Access Token
          </ButtonLoading>
        ) : (
          <Stack width={"100%"} gap={2}>
            <LabelText
              label={
                <Stack direction={"row"} alignItems={"center"}>
                  Token{" "}
                  <IconButton
                    size="small"
                    onClick={() =>
                      handleCopy("Copied Refresh Token", user.refreshToken)
                    }
                  >
                    <CopyAll fontSize={"10px"} />
                  </IconButton>
                </Stack>
              }
            >
              <Typography noWrap sx={{ width: "100%", overflowY: "auto" }}>
                {user.refreshToken}
              </Typography>
            </LabelText>
          </Stack>
        )}
      </Stack>
    </ButtonDialog>
  );
}

function verifyNewUser(
  email,
  confirmEmail,
  password,
  confirmPassword,
  firstName,
  lastName,
  dob,
  userTypeID
) {
  const errors = [];
  if (email.length === 0) {
    errors.push("Email is missing");
  } else {
    if (email !== confirmEmail) {
      errors.push("Email is mismatched");
    }
  }

  if (password.length === 0) {
    errors.push("Password is missing");
  } else {
    if (password !== confirmPassword) {
      errors.push("Password is mismatched");
    }
  }

  if (firstName.length === 0) {
    errors.push("First Name is missing");
  }
  if (lastName.length === 0) {
    errors.push("Last Name is missing");
  }
  if (dob.length === 0) {
    errors.push("Date of Birth is missing");
  }
  if (userTypeID.length === 0) {
    errors.push("User Type is missing");
  }

  return errors;
}
