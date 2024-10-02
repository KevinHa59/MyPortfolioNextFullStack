import { Divider, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Toggle from "../../../components/widgets/toggle/toggle";
import LabelText from "../../../components/widgets/texts/label-text";
import { editorContext } from ".";

export default function StyleComponent({}) {
  const { HTMLDataRef, setHTMLData, selectedRef } = useContext(editorContext);

  const handleChange = (newStyle) => {
    Object.entries(newStyle).forEach((item, index) => {
      const key = item[0];
      const value = item[1];
      selectedRef.current.styles[key] = value;
    });

    setHTMLData(HTMLDataRef.current);
  };

  return (
    <Stack>
      <Display
        component={selectedRef.current}
        styles={selectedRef.current.styles}
        onChange={(newValue) => handleChange(newValue)}
      />
    </Stack>
  );
}

function Display({ component, styles, onChange }) {
  return (
    <Stack>
      <Typography>#{component?.id}</Typography>
      <Divider />
      <LabelText label={"Display"}>
        <Toggle
          fullWidth={true}
          value={styles.display}
          options={["block", "flex", "grid"]}
          onChange={(value) => onChange && onChange({ display: value })}
        />
      </LabelText>
    </Stack>
  );
}
