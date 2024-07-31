import {
  Check,
  Facebook,
  GitHub,
  Instagram,
  LinkedIn,
  Public,
  Twitter,
} from "@mui/icons-material";
import {
  Button,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MyAPIs from "../../../pages/api-functions/MyAPIs";
import ButtonLoading from "../../widgets/buttons/button-loading";
import Input from "../../widgets/input/Input";
import axios from "axios";
import { StyleMode } from "../../../styles/useStyle";
import { darkStyles } from "../../../theme/dark-theme-options";

export default function Summary({ data, step, onChange }) {
  const [input, setInput] = useState("");
  const [userInfo, setUserInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    cellPhone: "",
    homePhone: "",
    linkedIn: "",
    github: "",
    twitter: "",
    facebook: "",
    instagram: "",
    portfolio: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    setInput(data.summary);
    setUserInfo((prev) => {
      const newUserInfo = {
        ...prev,
        ...data.user,
      };
      delete newUserInfo.password;
      delete newUserInfo.email;
      delete newUserInfo.refreshToken;
      return newUserInfo;
    });
  }, [data]);

  const handleUpdateResume = async () => {
    setIsSaving(true);
    const APIs = [
      MyAPIs.Resume().updateResume(data.id, {
        summary: input,
      }),
      MyAPIs.User().updateUser(userInfo),
    ];
    const res = await axios.all(APIs);
    setIsSaving(false);
  };

  const handleUpdateUserInfo = (newValue) => {
    setUserInfo((prev) => {
      return {
        ...prev,
        ...newValue,
      };
    });
  };

  return (
    <Stack height={"100%"} width={"100%"}>
      <Stack
        direction={"row"}
        gap={"1px"}
        justifyContent={"space-between"}
        height={"45px"}
        padding={1}
      >
        <Stack alignItems={"center"} direction={"row"} gap={1}>
          {step.Icon}
          <Typography>{step.name}</Typography>
        </Stack>
        <ButtonLoading
          size="small"
          isLoading={isSaving}
          variant="contained"
          startIcon={<Check />}
          onClick={handleUpdateResume}
        >
          Save
        </ButtonLoading>
      </Stack>
      <Divider />
      <Stack
        height={"calc(100% - 37px)"}
        sx={{ overflowY: "auto" }}
        gap={3}
        paddingX={5}
      >
        <Input
          value={input}
          label="Write short cool summary about yourself here... "
          fullWidth
          multiline
          rows={10}
          onChange={(event) => setInput(event.target.value)}
        />
        <Divider />

        <Stack direction={"row"} gap={1} width={"100%"}>
          <Input
            id="address"
            fullWidth={true}
            sx={{ width: "100%" }}
            value={userInfo.address || ""}
            label="Address"
            onChange={(event) =>
              handleUpdateUserInfo({ address: event.target.value })
            }
          />
          <Input
            id="city"
            sx={{ minWidth: "20%" }}
            value={userInfo.city || ""}
            label="City"
            onChange={(event) =>
              handleUpdateUserInfo({ city: event.target.value })
            }
          />
          <Input
            id="state"
            sx={{ minWidth: "20%" }}
            value={userInfo.state || ""}
            label="State"
            onChange={(event) =>
              handleUpdateUserInfo({ state: event.target.value })
            }
          />
          <Input
            id="zipCode"
            sx={{ inWidth: "15%" }}
            value={userInfo.zipCode || ""}
            label="Zip Code"
            onChange={(event) =>
              handleUpdateUserInfo({ zipCode: event.target.value })
            }
          />
        </Stack>

        <Input
          id="country"
          value={userInfo.country || ""}
          label="Country"
          onChange={(event) =>
            handleUpdateUserInfo({ country: event.target.value })
          }
        />
        <Divider />
        <Stack direction={"row"} gap={1} width={"100%"}>
          <Input
            id="phone"
            value={userInfo.cellPhone || ""}
            label="Cell Phone"
            onChange={(event) =>
              handleUpdateUserInfo({ cellPhone: event.target.value })
            }
          />
          <Input
            value={userInfo.homePhone || ""}
            label="Home Phone"
            onChange={(event) =>
              handleUpdateUserInfo({ homePhone: event.target.value })
            }
          />
        </Stack>
        <Divider />
        <Stack gap={1}>
          <Input
            id="linkedin"
            value={userInfo.linkedIn || ""}
            label="LinkedIn"
            inputProps={{
              startAdornment: <LinkedIn sx={{ paddingRight: 1 }} />,
            }}
            onChange={(event) =>
              handleUpdateUserInfo({ linkedIn: event.target.value })
            }
          />
          <Input
            id="github"
            value={userInfo.github || ""}
            label="GitHub"
            inputProps={{ startAdornment: <GitHub sx={{ paddingRight: 1 }} /> }}
            onChange={(event) =>
              handleUpdateUserInfo({ github: event.target.value })
            }
          />
          <Input
            id="twitter"
            value={userInfo.twitter || ""}
            label="Twitter"
            inputProps={{
              startAdornment: <Twitter sx={{ paddingRight: 1 }} />,
            }}
            onChange={(event) =>
              handleUpdateUserInfo({ twitter: event.target.value })
            }
          />
          <Input
            id="facebook"
            value={userInfo.facebook || ""}
            label="Facebook"
            inputProps={{
              startAdornment: <Facebook sx={{ paddingRight: 1 }} />,
            }}
            onChange={(event) =>
              handleUpdateUserInfo({ facebook: event.target.value })
            }
          />
          <Input
            id="instagram"
            value={userInfo.instagram || ""}
            label="Instagram"
            inputProps={{
              startAdornment: <Instagram sx={{ paddingRight: 1 }} />,
            }}
            onChange={(event) =>
              handleUpdateUserInfo({ instagram: event.target.value })
            }
          />
          <Input
            id="portfolio"
            value={userInfo.portfolio || ""}
            label="Portfolio"
            inputProps={{ startAdornment: <Public sx={{ paddingRight: 1 }} /> }}
            onChange={(event) =>
              handleUpdateUserInfo({ portfolio: event.target.value })
            }
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
