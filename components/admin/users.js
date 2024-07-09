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
import React, { useEffect, useState } from "react";
import ButtonDialog from "../widgets/buttons/button_dialog";
import UsersAPI from "../../pages/api-functions/UsersAPI";
import {
  Clear,
  DateRange,
  Delete,
  Edit,
  Email,
  Label,
  Password,
  Remove,
} from "@mui/icons-material";
import FormHeader from "../widgets/texts/form-header";
import ErrorRenderer from "../widgets/texts/error-renderer";
import LoadingComponent from "../widgets/loading/loading-component";
import SelectCustom from "../widgets/select/select-custom";
import Table from "../widgets/tables/table";
import Input from "../widgets/input/Input";
import jwt from "../../utils/jwt";
import MyAPIs from "../../pages/api-functions/MyAPIs";

export default function Users() {
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
    let data = await getUsers();
    data = data.map((user) => {
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
    const res = await getUserTypes();
    setUserTypes(res);
  }

  const handleEditUserOpen = (user) => {
    setEditUser(user);
    setIsNewUserOpen(true);
  };

  return (
    <Stack width={"100%"}>
      <Stack
        direction={"row"}
        gap={1}
        paddingX={1}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} gap={1} alignItems={"center"}>
          <Label />
          <Typography variant="h6" fontWeight={"bold"}>
            Users
          </Typography>
        </Stack>
        <Stack direction={"row"} gap={1}>
          <ButtonDialog
            open={isNewUserOpen}
            isCloseOnClickOut={false}
            onClick={() => setIsNewUserOpen(true)}
            sx_button={{ borderRadius: 0 }}
            variant={"contained"}
            button_label="Create New User"
            size="small"
            paperProps={{
              style: { minWidth: "max-content", maxWidth: "100vw" },
            }}
          >
            <NewUser
              userTypes={userTypes}
              value={editUser}
              onClose={() => {
                setIsNewUserOpen(false);
                setEditUser(null);
              }}
              onCreateUserSuccess={() => {
                initData();
                setIsNewUserOpen(false);
              }}
            />
          </ButtonDialog>
        </Stack>
      </Stack>
      <Divider sx={{ background: "rgba(100,100,100,1)" }} />
      {isGettingData && <LinearProgress />}
      {!isGettingData && (
        <Stack gap={"1px"} padding={1} paddingX={10}>
          <Table
            data={users}
            headers={headers}
            callback_cell={(row, key) => (
              <Cell
                row={row}
                header={key}
                onEdit={() => handleEditUserOpen(row)}
              />
            )}
          />
        </Stack>
      )}
    </Stack>
  );
}
function Cell({ row, header, onEdit }) {
  if (header === "userType") {
    return (
      <Chip
        size="small"
        label={`${row[header]}`}
        sx={{ background: row["userTypeColor"], fontWeight: "bold" }}
      />
    );
  } else if (header === "dob") {
    return new Date(
      row["dob"].split("T")[0] + "T05:00:00.000Z"
    ).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } else if (header === "actions") {
    const handleRemoveUser = async () => {
      const res = await removeUsers(row["id"]);
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
        <IconButton
          sx={{ borderRadius: "20px", paddingY: 0 }}
          variant="contained"
          size="small"
          color="error"
          onClick={() => handleRemoveUser()}
        >
          <Delete />
        </IconButton>
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

function NewUser({ value = null, userTypes, onClose, onCreateUserSuccess }) {
  const [input, setInput] = useState({
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    dob: "",
    userTypeID: "",
  });
  const [inputErrors, setInputErrors] = useState([]);
  const [isCreatingUser, setIsCreatingUser] = useState(false);

  useEffect(() => {
    if (value !== null) {
      const userInfo = {
        ...value,
        password: jwt.verifyToken(value.password)?.password || "",
      };
      setInput(userInfo);
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
      input.email,
      input.confirmEmail,
      input.password,
      input.confirmPassword,
      input.firstName,
      input.lastName,
      input.dob,
      input.userTypeID
    );
    setInputErrors(errors);
    if (errors.length === 0) {
      const res = await MyAPIs.User().createUser(
        input.email,
        input.firstName,
        input.lastName,
        input.dob,
        input.password,
        input.userTypeID
      );
      console.log(res);
      onCreateUserSuccess && onCreateUserSuccess();
    }
    setIsCreatingUser(false);
  };
  return (
    <Stack width={"400px"} gap={1} padding={1}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <FormHeader title={input.id ? "Edit User" : "New User"} />
        <IconButton size="small" color="error" onClick={onClose}>
          <Clear />
        </IconButton>
      </Stack>
      <Divider />
      <LoadingComponent isLoading={isCreatingUser} sx={{ paddingX: 4 }}>
        <Stack gap={2} width={"100%"}>
          <Stack gap={1}>
            <Input
              value={input.firstName}
              onChange={(e) => handleInputChange({ firstName: e.target.value })}
              autoComplete="off"
              size="small"
              label="First Name"
            />
            <Input
              value={input.lastName}
              onChange={(e) => handleInputChange({ lastName: e.target.value })}
              autoComplete="off"
              size="small"
              label="Last Name"
            />
            <Input
              InputProps={{
                startAdornment: <DateRange sx={{ paddingRight: 1 }} />,
              }}
              value={input.dob.split("T")[0]}
              onChange={(e) => handleInputChange({ dob: e.target.value })}
              autoComplete="off"
              size="small"
              type="date"
              label="Date of Birth"
            />
            <SelectCustom
              label={"User Type"}
              data={userTypes}
              selected_value={input.userTypeID}
              item_field={"type"}
              value_field={"id"}
              size="small"
              onChange={(value) => handleInputChange({ userTypeID: value })}
            />
          </Stack>
          <Divider />
          <Stack gap={1}>
            <Input
              value={input.email}
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
              value={input.confirmEmail}
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
          <Stack gap={1}>
            <Input
              value={input.password}
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
              value={input.confirmPassword}
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
        </Stack>
      </LoadingComponent>
      <ErrorRenderer errors={inputErrors} />
      <Divider />
      <Button size="small" onClick={handleCreateAccount}>
        Save
      </Button>
    </Stack>
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

// handle get user types data
async function getUserTypes(isUserIncluding = false) {
  try {
    const res = await UsersAPI.getUserTypes(isUserIncluding);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

// get all users
async function getUsers() {
  try {
    const res = await UsersAPI.getUsers();
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

// remove user
async function removeUsers(id) {
  try {
    const res = await UsersAPI.deleteUserByID(id);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}
