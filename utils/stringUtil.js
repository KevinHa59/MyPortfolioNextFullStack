import { CopyAll, Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { mainContext } from "../pages/_app";

export function phoneFormat(phone) {
  const phone_part = [...phone.split("")];
  const area = phone_part.splice(0, 3);
  const center = phone_part.splice(0, 3);
  return `(${area.join("")}) - ${center.join("")} ${phone_part.join("")}`;
}

export function _ellipsis(str, limit) {
  const text = (str || "").substring(0, limit);
  const isEllipsis = (str || "")?.length > limit || false;
  return `${text}${isEllipsis ? "..." : ""}`;
}

export function Ellipse({ str, limit }) {
  const { setNote } = useContext(mainContext);
  const [hide, setHide] = useState(true);
  return (
    <Stack direction={"row"} gap={1} alignItems={"center"}>
      {hide ? _ellipsis(str, limit) : str}
      <IconButton
        sx={{ padding: 0 }}
        size="small"
        onClick={() => {
          navigator.clipboard.writeText(str);
          setNote.info("Copied", 1000);
        }}
      >
        <CopyAll />
      </IconButton>
      <IconButton
        sx={{ padding: 0 }}
        size="small"
        onClick={() => setHide((prev) => !prev)}
      >
        {hide ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </Stack>
  );
}

export const stringUtil = {
  ellipsis: (str, limit) => _ellipsis(str, limit),
  Ellipses: (str, limit) => <Ellipse str={str} limit={limit} />,
};
