import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { profileContext } from "../../pages/profile";

export default function Membership() {
  const { mainData } = useContext(profileContext);
  const { membershipTypes } = mainData;
  console.log(membershipTypes);
  return (
    <Stack padding={4} gap={5}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h5">Subscription</Typography>
        {/* <Button startIcon={<Add />} color="success">
      Create New Resume
    </Button> */}
      </Stack>
      <Stack>
        <FormGroup>
          {membershipTypes?.map((item, index) => {
            return (
              <FormControlLabel
                key={index}
                control={<Checkbox defaultChecked />}
                label={<MembershipDetail membership={item} />}
              />
            );
          })}
        </FormGroup>
      </Stack>
    </Stack>
  );
}

function MembershipDetail({ membership }) {
  return membership.type;
}
