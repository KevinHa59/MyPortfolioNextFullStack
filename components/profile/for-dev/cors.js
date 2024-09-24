import {
  Button,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { profileContext } from "../../../pages/profile";
import MyAPIs from "../../../pages/api-functions/MyAPIs";
import ButtonLoading from "../../widgets/buttons/button-loading";
import { mainContext } from "../../../pages/_app";
import _ from "lodash";
export default function CORS() {
  const { setNote } = useContext(mainContext);
  const { router, mainData, updateMainData } = useContext(profileContext);
  const { user } = mainData;
  const [isSaving, setIsSaving] = useState(false);
  const [origins, setOrigins] = useState([""]);
  useEffect(() => {
    if (
      !_.isEqual(user?.credential?.allowedOrigins, origins) &&
      user?.credential?.allowedOrigins.length > 0
    ) {
      setOrigins(user?.credential?.allowedOrigins);
    }
  }, [user]);

  const handleOriginChange = (value, index) => {
    const copy = _.cloneDeep(origins);
    copy[index] = value;
    setOrigins(copy);
  };

  const handleAdd = () => {
    const copy = _.cloneDeep(origins);
    copy.unshift("");
    setOrigins(copy);
  };
  const handleRemove = (index) => {
    const copy = _.cloneDeep(origins);
    copy.splice(index, 1);
    setOrigins(copy);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const _origins = origins.filter((or) => or !== null && or.length > 0);
      const res = await MyAPIs.Credential().updateOrigins(
        user?.credentialID,
        _origins
      );
      if (res) {
        updateMainData({
          ...mainData,
          user: {
            ...mainData.user,
            credentialID: res.data.id,
            credential: res.data,
          },
        });
        setNote.success("Save Origins Success");
        if (_origins.length === 0) {
          setOrigins([""]);
        }
      } else {
        setNote.error("Save Origins Fail");
      }
      setIsSaving(false);
    } catch (error) {
      setNote.error("Save Origins Fail");
      setIsSaving(false);
      console.log(error);
    }
  };

  return (
    <Stack padding={4} gap={5}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h5">CORS</Typography>
      </Stack>
      <Paper variant="outlined">
        <Typography
          variant="body2"
          fontStyle={"italic"}
          sx={{ whiteSpace: "pre-wrap", padding: 2, color: "info.main" }}
        >{`CORS lets JavaScript from external hosts interact with API. Specify allowed origins (e.g., http://example.com:12345). Use "*" to allow all and remove other entries. Slashes are not allowed after the TLD.`}</Typography>
      </Paper>
      {user?.credentialID && (
        <Paper variant="outlined" sx={{ padding: 2 }}>
          <Stack gap={1}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography variant="body2" fontWeight={"bold"}>
                Allowed Origins
              </Typography>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Button size="small" onClick={handleAdd}>
                  Add
                </Button>
                <ButtonLoading
                  disabled={!isValidInput(origins)}
                  size="small"
                  isLoading={isSaving}
                  onClick={handleSave}
                  color="secondary"
                  sx={{ width: "max-content" }}
                >
                  Save
                </ButtonLoading>
              </Stack>
            </Stack>
            <Divider />
            {origins.map((origin, index) => {
              return (
                <TextField
                  size="small"
                  key={index}
                  error={origin.endsWith("/")}
                  value={origin}
                  onChange={(e) => handleOriginChange(e.target.value, index)}
                  InputProps={{
                    endAdornment: (
                      <Stack direction={"row"} gap={2} alignItems={"center"}>
                        {origin.endsWith("/") && (
                          <Typography
                            variant="body2"
                            fontStyle={"italic"}
                            sx={{ color: "error.main", whiteSpace: "nowrap" }}
                          >
                            {`Slashes "/" are not allowed after the TLD`}
                          </Typography>
                        )}
                        <Button
                          size="small"
                          color="error"
                          onClick={() => handleRemove(index)}
                        >
                          Remove
                        </Button>
                      </Stack>
                    ),
                  }}
                />
              );
            })}
          </Stack>
        </Paper>
      )}
      {!user?.credentialID && (
        <Stack alignItems={"center"}>
          <Typography textAlign={"center"}>
            To access this page, you must create a Credential.
          </Typography>
          <Button
            color="success"
            onClick={() => {
              router.push({
                pathname: router.pathname,
                query: {
                  section: "credential",
                },
              });
            }}
          >
            Go to Credential
          </Button>
        </Stack>
      )}
    </Stack>
  );
}

function isValidInput(origins) {
  let result = true;
  origins.forEach((or) => {
    if (or.endsWith("/")) {
      result = false;
    }
  });
  return result;
}
