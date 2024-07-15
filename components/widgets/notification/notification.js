import { Paper, Slide, Stack } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { mainContext } from "../../../pages/_app";
import PaperForm from "../paper/paper-form";

export default function Notification({ note = null }) {
  const { setNote } = useContext(mainContext);
  const [info, setInfo] = useState({
    active: null,
    note: null,
  });
  const handleUpdateInfo = (newValue) => {
    setInfo((prev) => {
      return {
        ...prev,
        ...newValue,
      };
    });
  };

  useEffect(() => {
    if (note !== null) {
      handleUpdateInfo({ note: note, active: true });
      const _out = setTimeout(() => {
        handleUpdateInfo({ active: false });
        setNote(null);
      }, 3000);

      return () => {
        clearTimeout(_out);
      };
    }
  }, [note]);

  return (
    <Slide in={info.active} direction="up" timeout={1000}>
      <Stack
        width={"100%"}
        alignItems="center"
        sx={{
          zIndex: 2000,
          position: "fixed",
          bottom: "50px",
          left: 0,
        }}
      >
        <PaperForm>
          <Stack padding={1}>{info.note}</Stack>
        </PaperForm>
      </Stack>
    </Slide>
  );
}
