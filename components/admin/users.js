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
  Password,
  Remove,
} from "@mui/icons-material";
import FormHeader from "../widgets/texts/form-header";
import ErrorRenderer from "../widgets/texts/error-renderer";
import LoadingComponent from "../widgets/loading/loading-component";
import SelectCustom from "../widgets/select/select-custom";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [userTypes, setUserTypes] = useState([]);
  const [isGettingData, setIsGettingData] = useState(true);
  const [isNewUserOpen, setIsNewUserOpen] = useState(false);

  useEffect(() => {
    initData();
    getAllUserTypes();
  }, []);

  async function initData() {
    setIsGettingData(true);
    const data = await getUsers();
    setUsers(data);
    setIsGettingData(false);
  }

  async function getAllUserTypes() {
    const res = await getUserTypes();
    setUserTypes(res);
  }

  return (
    <Stack width={"100%"}>
      <Stack direction={"row"} gap={1}>
        <ButtonDialog
          open={isNewUserOpen}
          isCloseOnClickOut={false}
          onClick={() => setIsNewUserOpen(true)}
          sx_button={{ borderRadius: 0 }}
          variant={"contained"}
          button_label="Create New User"
          size="small"
        >
          <NewUser
            userTypes={userTypes}
            onClose={() => setIsNewUserOpen(false)}
            onCreateUserSuccess={() => {
              initData();
              setIsNewUserOpen(false);
            }}
          />
        </ButtonDialog>
      </Stack>
      <Divider sx={{ background: "rgba(100,100,100,1)" }} />
      {isGettingData && <LinearProgress />}
      {!isGettingData && (
        <Stack gap={"1px"} padding={1}>
          {users.map((user, index) => {
            return (
              <Slide
                direction="right"
                key={index}
                in={true}
                timeout={400}
                style={{ transitionDelay: index * 50 }}
              >
                <Stack>
                  <UserCard
                    user={user}
                    index={index}
                    onRemoveSuccess={initData}
                  />
                </Stack>
              </Slide>
            );
          })}
        </Stack>
      )}
    </Stack>
  );
}

function UserCard({ user, index, onRemoveSuccess }) {
  const theme = useTheme();
  const palette = theme.palette;
  const handleRemoveUser = async () => {
    const res = await removeUsers(user.id);
    onRemoveSuccess && onRemoveSuccess();
  };
  return (
    <Fade in={true} timeout={500} style={{ transitionDelay: index * 50 }}>
      <Paper
        sx={{
          paddingX: 1,
          borderRadius: 0,
          ":hover": {
            background: "rgba(230,230,230,1)",
          },
        }}
      >
        <Grid container>
          <Grid
            item
            xs={2}
            sx={{ fontWeight: "bold" }}
          >{`${user.firstName} ${user.lastName}`}</Grid>
          <Grid item xs={4}>{`${user.email}`}</Grid>
          <Grid item xs={2}>{`${new Date(
            user.dob.split("T")[0] + "T05:00:00.000Z"
          ).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}`}</Grid>
          <Grid item xs={2}>
            <Stack
              alignItems={"center"}
              justifyContent={"center"}
              height={"100%"}
            >
              <Chip
                variant="outlined"
                size="small"
                label={`${user.userType.type}`}
                sx={{ background: user.userType.color, fontWeight: "bold" }}
              />
            </Stack>
          </Grid>
          <Grid item xs={2}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"flex-end"}
              gap={"1px"}
            >
              <Button
                sx={{ borderRadius: 0 }}
                // variant="contained"
                startIcon={<Edit />}
                size="small"
                color="warning"
              >
                Edit
              </Button>
              <Button
                sx={{ borderRadius: 0 }}
                // variant="contained"
                startIcon={<Delete />}
                size="small"
                color="error"
                onClick={() => handleRemoveUser()}
              >
                Remove
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Fade>
  );
}

function NewUser({ userTypes, onClose, onCreateUserSuccess }) {
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
      const res = await createUser(
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
    <Stack width={"300px"} gap={1} padding={1}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <FormHeader title={"New User"} />
        <IconButton size="small" color="error" onClick={onClose}>
          <Clear />
        </IconButton>
      </Stack>
      <Divider />
      <LoadingComponent isLoading={isCreatingUser}>
        <Stack gap={2} width={"100%"}>
          <Stack gap={1}>
            <TextField
              value={input.firstName}
              onChange={(e) => handleInputChange({ firstName: e.target.value })}
              autoComplete="off"
              size="small"
              label="First Name"
            />
            <TextField
              value={input.lastName}
              onChange={(e) => handleInputChange({ lastName: e.target.value })}
              autoComplete="off"
              size="small"
              label="Last Name"
            />
            <TextField
              InputProps={{
                startAdornment: <DateRange sx={{ paddingRight: 1 }} />,
              }}
              value={input.dob}
              onChange={(e) => handleInputChange({ dob: e.target.value })}
              autoComplete="off"
              size="small"
              type="date"
            />
            <SelectCustom
              label={"User Type"}
              data={userTypes}
              item_field={"type"}
              value_field={"id"}
              size="small"
              onChange={(value) => handleInputChange({ userTypeID: value })}
            />
          </Stack>
          <Divider />
          <Stack gap={1}>
            <TextField
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
            <TextField
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
            <TextField
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
            <TextField
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
          <ErrorRenderer errors={inputErrors} />
          <Divider />
          <Button size="small" onClick={handleCreateAccount}>
            Create
          </Button>
        </Stack>
      </LoadingComponent>
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

// create user
async function createUser(
  email,
  firstName,
  lastName,
  dob,
  password,
  userTypeID
) {
  try {
    const res = await UsersAPI.createUser(
      email,
      firstName,
      lastName,
      dob,
      password,
      userTypeID
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}
