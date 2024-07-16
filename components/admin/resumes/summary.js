import { Check } from "@mui/icons-material";
import { Button, Divider, IconButton, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import MyAPIs from "../../../pages/api-functions/MyAPIs";
import ButtonLoading from "../../widgets/buttons/button-loading";
import Input from "../../widgets/input/Input";

export default function Summary({ data, onChange }) {
  const [input, setInput] = useState("");
  const [userInfo, setUserInfo] = useState({
    address: null,
    city: null,
    state: null,
    country: null,
    zipCode: null,
    cellPhone: null,
    homePhone: null,
    linkedIn: null,
    github: null,
    twitter: null,
    facebook: null,
    instagram: null,
    portfolio: null,
  });
  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    setInput(data.summary);
  }, [data]);

  const handleUpdateResume = async () => {
    setIsSaving(true);
    const res = await MyAPIs.Resume().updateResume(data.id, {
      summary: input,
    });
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
    <Stack height={"100%"}>
      <Stack
        height={"calc(100% - 37px)"}
        sx={{ overflowY: "auto" }}
        gap={3}
        padding={5}
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
        <Stack>
          <Input
            value={userInfo.linkedIn || ""}
            label="LinkedIn"
            onChange={(event) =>
              handleUpdateUserInfo({ linkedIn: event.target.value })
            }
          />
          <Input
            value={userInfo.github || ""}
            label="GitHub"
            onChange={(event) =>
              handleUpdateUserInfo({ github: event.target.value })
            }
          />
          <Input
            value={userInfo.twitter || ""}
            label="Twitter"
            onChange={(event) =>
              handleUpdateUserInfo({ twitter: event.target.value })
            }
          />
          <Input
            value={userInfo.facebook || ""}
            label="Facebook"
            onChange={(event) =>
              handleUpdateUserInfo({ facebook: event.target.value })
            }
          />
          <Input
            value={userInfo.instagram || ""}
            label="Instagram"
            onChange={(event) =>
              handleUpdateUserInfo({ instagram: event.target.value })
            }
          />
          <Input
            value={userInfo.portfolio || ""}
            label="Portfolio"
            onChange={(event) =>
              handleUpdateUserInfo({ portfolio: event.target.value })
            }
          />
        </Stack>
      </Stack>
      <Divider />
      <Stack
        direction={"row"}
        gap={"1px"}
        justifyContent={"flex-end"}
        height={"37px"}
      >
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
    </Stack>
  );
}

// address: null,
// city: null,
// state: null,
// country: null,
// zipCode: null,
// cellPhone: null,
// homePhone: null,
// linkedIn: null,
// github: null,
// twitter: null,
// facebook: null,
// instagram: null,
// portfolio: null,
