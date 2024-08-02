import { Stack } from "@mui/material";
import React, { useState } from "react";

export default function InputForm({ isEdit = false, children }) {
  const [isEditActive, setIsEditActive] = useState(isEdit);
  return <Stack>{() => children(isEditActive)}</Stack>;
}
