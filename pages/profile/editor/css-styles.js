export const layout = {
  display: "inline", // Type of box model (block, inline, flex, grid, etc.)
  width: "auto", // Width of the element
  height: "auto", // Height of the element
  margin: "0", // Space outside the element's border
  padding: "0", // Space inside the element's border
  boxSizing: "content-box", // Box model (content-box or border-box)
  overflow: "visible", // How to handle content overflow (hidden, scroll, auto, etc.)
  float: "none", // Float property (left, right, none)
  clear: "none", // Clearing floats
};

export const block = {
  textAlign: "start", // Aligns text to the start (dependent on text direction)
  verticalAlign: "baseline", // Aligns baseline of element relative to its container
  // Less commonly used flexbox properties
  more: {
    float: "none", // No floating
    clear: "none", // No clearing (clear floats)
  },
};

export const flexbox = {
  // Commonly used flexbox properties
  flexDirection: "row", // Direction of flex items (row, column, etc.)
  justifyContent: "flex-start", // Horizontal alignment of flex items
  alignItems: "stretch", // Vertical alignment of flex items
  flexWrap: "nowrap", // Whether flex items wrap to the next line
  gap: "0", // Space between flex items

  // Less commonly used flexbox properties
  more: {
    alignContent: "stretch", // Aligning lines of flex containers when there is extra space
    order: "0", // Order of the flex item
    flexGrow: "0", // Ability to grow
    flexShrink: "1", // Ability to shrink
    flexBasis: "auto", // Default size of the flex item
  },
};

export const gridbox = {
  // Commonly used properties
  gridTemplateColumns: "none", // Defines the columns of the grid
  gridTemplateRows: "none", // Defines the rows of the grid
  gap: "0", // Space between grid items (shorthand for row-gap and column-gap)
  justifyItems: "stretch", // Aligns grid items along the row axis
  alignItems: "stretch", // Aligns grid items along the column axis
  justifyContent: "start", // Aligns the grid along the row axis (main axis)
  alignContent: "start", // Aligns the grid along the column axis (cross axis)
  overflow: "visible", // Determines how content is handled when overflowing the grid container

  // Less commonly used properties
  more: {
    gridTemplateAreas: "none", // Defines named grid areas
    gridAutoColumns: "auto", // Defines the size of auto-generated columns
    gridAutoRows: "auto", // Defines the size of auto-generated rows
    gridAutoFlow: "row", // Controls the flow of the grid items
    rowGap: "0", // Space between rows
    columnGap: "0", // Space between columns
    gridRow: "auto", // Defines a grid item's position within the rows
    gridColumn: "auto", // Defines a grid item's position within the columns
    gridArea: "auto", // Defines a grid item's area in the grid
  },
};

export const positioning = {
  position: "static", // Positioning model (static, relative, absolute, fixed, sticky)
  top: "auto", // Vertical offset for relative, absolute, or fixed positioning
  right: "auto", // Horizontal offset (right)
  bottom: "auto", // Vertical offset (bottom)
  left: "auto", // Horizontal offset (left)
  zIndex: "auto", // Stacking order
};

export const background = {
  backgroundColor: "transparent", // Background color
  backgroundImage: "none", // Background image
  backgroundPosition: "0% 0%", // Position of background image
  backgroundRepeat: "repeat", // Repeat background image
  backgroundSize: "auto", // Background size (cover, contain, etc.)
  backgroundAttachment: "scroll",
};

export const typography = {
  color: "initial", // Text color
  fontFamily: "inherit", // Font family
  fontSize: "medium", // Font size
  fontWeight: "normal", // Font weight (normal, bold, etc.)
  lineHeight: "normal", // Space between lines of text
  textAlign: "start", // Horizontal alignment of text (left, right, center)
  textDecoration: "none", // Text decoration (underline, overline, etc.)
  letterSpacing: "normal", // Spacing between letters
  wordSpacing: "normal", // Spacing between words
  whiteSpace: "normal", // How whitespace is handled (nowrap, pre, etc.)
  verticalAlign: "baseline", // Vertical alignment of inline or table-cell elements
  textTransform: "none", // Text transformation (uppercase, lowercase, capitalize)
};

export const boxShadowAndEffects = {
  boxShadow: "none", // Box shadow effect
  opacity: "1", // Opacity (transparency level)
};

export const propOptions = {
  display: [
    "none",
    "block",
    "inline",
    "inline-block",
    "flex",
    "grid",
    "inline-grid",
    "inherit",
    "initial",
    "unset",
  ],
  width: [
    "auto",
    "inherit",
    "initial",
    "unset",
    "max-content",
    "min-content",
    "fit-content",
  ],
  height: [
    "auto",
    "inherit",
    "initial",
    "unset",
    "max-content",
    "min-content",
    "fit-content",
  ],
  margin: ["auto", "inherit", "initial", "unset"],
  padding: ["inherit", "initial", "unset"],
  boxSizing: ["content-box", "border-box", "inherit", "initial", "unset"],
  overflow: [
    "visible",
    "hidden",
    "scroll",
    "auto",
    "inherit",
    "initial",
    "unset",
  ],
  float: ["none", "left", "right", "inherit", "initial", "unset"],
  clear: ["none", "left", "right", "both", "inherit", "initial", "unset"],
  flexDirection: [
    "row",
    "row-reverse",
    "column",
    "column-reverse",
    "inherit",
    "initial",
    "unset",
  ],
  justifyContent: [
    "flex-start",
    "flex-end",
    "center",
    "space-between",
    "space-around",
    "space-evenly",
    "inherit",
    "initial",
    "unset",
  ],
  alignItems: [
    "stretch",
    "flex-start",
    "flex-end",
    "center",
    "baseline",
    "inherit",
    "initial",
    "unset",
  ],
  flexWrap: ["nowrap", "wrap", "wrap-reverse", "inherit", "initial", "unset"],
  alignContent: [
    "stretch",
    "flex-start",
    "flex-end",
    "center",
    "space-between",
    "space-around",
    "inherit",
    "initial",
    "unset",
  ],
  order: ["inherit", "initial", "unset"],
  flexGrow: [
    "0", // Indicates no growth
    "1", // Indicates the item can grow to fill space
    "inherit",
    "initial",
    "unset",
  ],
  flexShrink: [
    "0", // Indicates no shrinkage
    "1", // Indicates the item can shrink
    "inherit",
    "initial",
    "unset",
  ],
  flexBasis: [
    "auto", // Default size
    "0", // No space
    "100%", // Full width
    "inherit",
    "initial",
    "unset",
  ],
  gridTemplateColumns: [
    "none",
    "auto",
    "1fr",
    "repeat(auto-fill, minmax(100px, 1fr))",
    "min-content",
    "max-content",
  ], // Defines the structure of columns
  gridTemplateRows: [
    "none",
    "auto",
    "1fr",
    "repeat(auto-fill, minmax(100px, 1fr))",
    "min-content",
    "max-content",
  ], // Defines the structure of rows
  gridTemplateAreas: [
    "none",
    `"header header" "sidebar content" "footer footer"`, // Example template
    `"a a a" "b c c" "d d e"`, // Example template
  ], // Defines named areas in the grid
  gridAutoColumns: ["auto", "min-content", "max-content", "1fr"], // Default size for auto-generated columns
  gridAutoRows: ["auto", "min-content", "max-content", "1fr"], // Default size for auto-generated rows
  gridAutoFlow: ["row", "column", "row dense", "column dense"], // Controls automatic placement
  gridRow: ["auto", "span 2", "1 / 2", "2 / span 3"], // Row start/end positions
  gridColumn: ["auto", "span 2", "1 / 2", "2 / span 3"], // Column start/end positions
  gridArea: ["auto", "header", "content", "footer"], // The name or position of a grid area
  position: [
    "static",
    "relative",
    "absolute",
    "fixed",
    "sticky",
    "inherit",
    "initial",
    "unset",
  ],
  top: ["auto", "inherit", "initial", "unset"],
  right: ["auto", "inherit", "initial", "unset"],
  bottom: ["auto", "inherit", "initial", "unset"],
  left: ["auto", "inherit", "initial", "unset"],
  zIndex: ["auto", "inherit", "initial", "unset"],
  backgroundPosition: [
    "0% 0%",
    "50% 50%", // Center
    "top",
    "bottom",
    "left",
    "right", // Basic positions
    "top left",
    "top right",
    "bottom left",
    "bottom right", // Corner positions
    "inherit",
    "initial",
    "unset",
  ],
  backgroundRepeat: [
    "repeat",
    "repeat-x", // Repeat horizontally
    "repeat-y", // Repeat vertically
    "no-repeat", // Do not repeat
    "inherit",
    "initial",
    "unset",
  ],
  backgroundSize: [
    "auto", // Default size
    "cover", // Scale the image to cover the entire area
    "contain", // Scale the image to fit within the area
    "100%", // Full width
    "50%", // Half width
    "0", // No size
    "inherit",
    "initial",
    "unset",
  ],
  backgroundAttachment: [
    "scroll", // Default behavior; background moves with the content.
    "fixed", // Background is fixed in the viewport; doesn't move with content.
    "local", // Background is fixed relative to the element's content.
  ],
  fontFamily: [
    "inherit",
    "serif",
    "sans-serif",
    "monospace",
    "cursive",
    "fantasy",
    // Add specific font names as needed
    "Arial",
    "Helvetica",
    "Georgia",
    "Times New Roman",
    "Courier New",
    "initial",
    "unset",
  ],
  fontSize: [
    "medium", // Default size
    "small",
    "large",
    "x-large",
    "xx-large",
    "inherit",
    "initial",
    "unset",
  ],
  fontWeight: [
    "normal",
    "bold",
    "bolder",
    "lighter",
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
    "inherit",
    "initial",
    "unset",
  ],
  lineHeight: ["normal", "inherit", "initial", "unset"],
  textAlign: [
    "start", // Align text to the start (left in LTR, right in RTL)
    "end", // Align text to the end (right in LTR, left in RTL)
    "left",
    "right",
    "center",
    "justify",
    "inherit",
    "initial",
    "unset",
  ],
  textDecoration: [
    "none",
    "underline",
    "overline",
    "line-through",
    "inherit",
    "initial",
    "unset",
  ],
  letterSpacing: ["normal", "inherit", "initial", "unset"],
  wordSpacing: ["normal", "inherit", "initial", "unset"],
  whiteSpace: [
    "normal",
    "nowrap",
    "pre",
    "pre-wrap",
    "pre-line",
    "inherit",
    "initial",
    "unset",
  ],
  verticalAlign: [
    "baseline",
    "sub",
    "super",
    "top",
    "text-top",
    "middle",
    "bottom",
    "text-bottom",
    "inherit",
    "initial",
    "unset",
  ],
  textTransform: [
    "none",
    "capitalize", // Capitalize the first letter of each word
    "uppercase", // Convert all characters to uppercase
    "lowercase", // Convert all characters to lowercase
    "inherit",
    "initial",
    "unset",
  ],
};
