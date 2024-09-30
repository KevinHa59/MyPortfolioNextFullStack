import { Add } from "@mui/icons-material";
import { Button, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { profileContext } from "../../../pages/profile";
import MyAPIs from "../../../pages/api-functions/MyAPIs";
import { stringUtil } from "../../../utils/stringUtil";
import ButtonLoading from "../../widgets/buttons/button-loading";
import { mainContext } from "../../../pages/_app";
import ButtonDialogConfirm from "../../widgets/buttons/button_dialog_confirm";
// {
//     "id": "66f1d2cfc76bbef2bf1087cb",
//     "apiKey": "ez_folio_fb9484b1-8651-44a5-83c7-d8eeea650d8a",
//     "allowedOrigins": [],
//     "createdAt": "2024-09-23T20:42:53.518Z"
// }
export default function Credential() {
  const { setNote } = useContext(mainContext);
  const { mainData, updateMainData } = useContext(profileContext);
  const { user } = mainData;
  const [isGenerateKey, setIsGenerateKey] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const handleGenerateCredential = async () => {
    setIsGenerateKey(true);
    try {
      const res = await MyAPIs.Credential().createCredential(user.id);
      if (res) {
        updateMainData({
          ...mainData,
          user: {
            ...mainData.user,
            credentialID: res.data.id,
            credential: res.data,
          },
        });
      }
      setIsGenerateKey(false);
    } catch (error) {
      setIsGenerateKey(false);
      console.log(error);
    }
  };

  const handleGenerateNewKey = async () => {
    setIsGenerateKey(true);
    try {
      const res = await MyAPIs.Credential().updateCredential(user.credentialID);
      if (res) {
        updateMainData({
          ...mainData,
          user: {
            ...mainData.user,
            credentialID: res.data.id,
            credential: res.data,
          },
        });
        setNote.success("Generated new x-api-key");
      }
      setIsGenerateKey(false);
    } catch (error) {
      setIsGenerateKey(false);
      console.log(error);
    }
  };

  const handleDeleteCredential = async () => {
    setIsDelete(true);
    try {
      const res = await MyAPIs.Credential().deleteCredential(user.credentialID);
      if (res) {
        updateMainData({
          ...mainData,
          user: {
            ...res.data,
          },
        });
        setNote.success("Delete Credential Success");
      }
    } catch (error) {
      setIsDelete(false);
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
        <Typography variant="h5">Credential</Typography>
      </Stack>
      <Paper>
        <Typography
          variant="body2"
          fontStyle={"italic"}
          sx={{ whiteSpace: "pre-wrap", padding: 2, color: "info.main" }}
        >{`Welcome to the Credential Management Page! 
\nHere, you can manage your API credential, which includes a unique API key that grants you secure access to our services. 
\nThis credential allows you to specify authorized origins, ensuring that your API key is used safely and effectively.`}</Typography>
      </Paper>
      {user?.credentialID === null ? (
        <Stack alignItems={"center"}>
          <Typography textAlign={"center"}>
            You do not have a credential
          </Typography>
          <ButtonLoading
            isLoading={isGenerateKey}
            startIcon={<Add />}
            color="success"
            onClick={handleGenerateCredential}
          >
            Generate a Credential
          </ButtonLoading>
        </Stack>
      ) : (
        <>
          <Paper>
            <Grid container spacing={2} padding={2}>
              <Grid item xs={2}>
                Header
              </Grid>
              <Grid item xs={10}>
                x-api-key
              </Grid>
              <Grid item xs={2}>
                Value
              </Grid>
              <Grid item xs={10}>
                {stringUtil.Ellipses(user?.credential?.apiKey, 20)}
              </Grid>
              <Grid item xs={2}>
                Created At
              </Grid>
              <Grid item xs={10}>
                {new Date(user?.credential?.createdAt).toLocaleString()}
              </Grid>
              <Grid item xs={2}>
                Last Updated At
              </Grid>
              <Grid item xs={10}>
                {new Date(user?.credential?.updatedAt).toLocaleString()}
              </Grid>
            </Grid>
          </Paper>
          <Paper sx={{ padding: 2 }}>
            <Stack gap={2}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography
                  fontStyle={"italic"}
                  sx={{ color: "warning.main", whiteSpace: "pre-wrap" }}
                >
                  {`In case your x-api-key is leaked or stolen,
it is recommended to regenerate a new key immediately to maintain the security of your application.`}
                </Typography>
                <ButtonLoading
                  isLoading={isGenerateKey}
                  className="br0"
                  color="warning"
                  onClick={handleGenerateNewKey}
                >
                  Generate New Key
                </ButtonLoading>
              </Stack>
              <Divider />
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography
                  fontStyle={"italic"}
                  sx={{ color: "error.main", whiteSpace: "pre-wrap" }}
                >
                  {`In case you no longer need credential,
it is recommended to delete to maintain the security of your application.`}
                </Typography>
                <ButtonDialogConfirm
                  isLoading={isDelete}
                  // variant="outlined"
                  className="br0"
                  color="error"
                  onConfirm={handleDeleteCredential}
                  dialog_color={"error"}
                  dialog_title={"Delete Credential"}
                  dialog_message={"Are you sure?"}
                >
                  Delete Credential
                </ButtonDialogConfirm>
              </Stack>
            </Stack>
          </Paper>
        </>
      )}
    </Stack>
  );
}
