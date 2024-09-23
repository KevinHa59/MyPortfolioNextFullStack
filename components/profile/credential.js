import { Add } from "@mui/icons-material";
import { Button, Paper, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import { profileContext } from "../../pages/profile";
import MyAPIs from "../../pages/api-functions/MyAPIs";
// {
//     "id": "66f1d2cfc76bbef2bf1087cb",
//     "apiKey": "ez_folio_fb9484b1-8651-44a5-83c7-d8eeea650d8a",
//     "allowedOrigins": [],
//     "createdAt": "2024-09-23T20:42:53.518Z"
// }
export default function Credential() {
  const { mainData, updateMainData } = useContext(profileContext);
  const { user } = mainData;
  console.log(user);

  const handleGenerateCredential = async () => {
    try {
      const res = await MyAPIs.Credential().createCredential(user.id);
      if (res) {
        updateMainData({
          credentialID: res.data.id,
          credential: res.data,
        });
      }
    } catch (error) {}
  };

  return (
    <Stack padding={4} gap={5}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h5">Credential</Typography>
      </Stack>
      <Paper variant="outlined">
        <Typography
          variant="body2"
          fontStyle={"italic"}
          sx={{ whiteSpace: "pre-wrap", padding: 2 }}
        >{`Welcome to the Credential Management Page! 
\nHere, you can manage your API credential, which includes a unique API key that grants you secure access to our services. 
\nThis credential allows you to specify authorized origins, ensuring that your API key is used safely and effectively.`}</Typography>
      </Paper>
      {user.credentialID === null ? (
        <Stack alignItems={"center"}>
          <Typography textAlign={"center"}>
            You do not have a credential
          </Typography>
          <Button
            startIcon={<Add />}
            color="success"
            onClick={handleGenerateCredential}
          >
            Generate a Credential
          </Button>
        </Stack>
      ) : (
        <Stack>{user.credential?.apiKey}</Stack>
      )}
    </Stack>
  );
}
