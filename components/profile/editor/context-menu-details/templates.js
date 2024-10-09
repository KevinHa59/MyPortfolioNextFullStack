import { ContentPaste, DeleteForever } from "@mui/icons-material";
import { Divider, Typography } from "@mui/material";
import { flex } from "./group/flex";
import { block } from "./group/block";

const block_template = {
  tagName: "div",
  id: "block",
  attributes: {},
  styles: {
    display: "block",
    width: "100%",
  },
  children: [],
};

const row_template = {
  tagName: "div",
  id: "row",
  attributes: {},
  styles: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  children: [],
};
const column_template = {
  tagName: "div",
  id: "column",
  attributes: {},
  styles: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  children: [],
};

export const menuData = [
  {
    Component: (
      <Typography
        textAlign={"left"}
        variant="body2"
        fontStyle={"italic"}
        sx={{ paddingX: 1 }}
      >
        Layout
      </Typography>
    ),
  },
  {
    label: "Insert",
    subMenu: [
      {
        label: "Container",
        subMenu: [
          {
            label: "Block",
            event: "Insert",
            data: block_template,
            subMenu: [],
          },
          {
            label: "Row",
            event: "Insert",
            data: row_template,
            subMenu: [],
          },
          {
            label: "Column",
            event: "Insert",
            data: column_template,
            subMenu: [],
          },
        ],
      },
    ],
  },
  {
    Component: <Divider />,
  },
  {
    label: "Styles",
    subMenu: [flex, block],
  },
  {
    Component: <Divider />,
  },
  {
    Component: (
      <Typography
        textAlign={"left"}
        variant="body2"
        fontStyle={"italic"}
        sx={{ paddingX: 1 }}
      >
        Actions
      </Typography>
    ),
  },
  {
    label: "Paste",
    event: "Paste",
    Icon: ContentPaste,
  },
  {
    label: "Delete",
    event: "Delete",
    Icon: DeleteForever,
  },
];
