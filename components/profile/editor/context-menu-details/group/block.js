export const block = {
  label: "Block",
  subMenu: [
    {
      label: "Visibility",
      subMenu: [
        {
          label: "Visible",
          event: "Insert",
          data: {
            visibility: "visible",
          },
          subMenu: [],
        },
        {
          label: "Hidden",
          event: "Insert",
          data: {
            visibility: "hidden",
          },
          subMenu: [],
        },
        {
          label: "Collapse",
          event: "Insert",
          data: {
            visibility: "collapse",
          },
          subMenu: [],
        },
      ],
    },
    {
      label: "Overflow",
      subMenu: [
        {
          label: "Visible",
          event: "Insert",
          data: {
            overflow: "visible",
          },
          subMenu: [],
        },
        {
          label: "Hidden",
          event: "Insert",
          data: {
            overflow: "hidden",
          },
          subMenu: [],
        },
        {
          label: "Scroll",
          event: "Insert",
          data: {
            overflow: "scroll",
          },
          subMenu: [],
        },
        {
          label: "Auto",
          event: "Insert",
          data: {
            overflow: "auto",
          },
          subMenu: [],
        },
      ],
    },
    {
      label: "Position",
      subMenu: [
        {
          label: "Static",
          event: "Insert",
          data: {
            position: "static",
          },
          subMenu: [],
        },
        {
          label: "Relative",
          event: "Insert",
          data: {
            position: "relative",
          },
          subMenu: [],
        },
        {
          label: "Absolute",
          event: "Insert",
          data: {
            position: "absolute",
          },
          subMenu: [],
        },
        {
          label: "Fixed",
          event: "Insert",
          data: {
            position: "fixed",
          },
          subMenu: [],
        },
        {
          label: "Sticky",
          event: "Insert",
          data: {
            position: "sticky",
          },
          subMenu: [],
        },
      ],
    },
  ],
};
