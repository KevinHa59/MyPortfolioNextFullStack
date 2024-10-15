import { Editor } from "@monaco-editor/react";
import { useTheme } from "@mui/material";
import React, { useContext, useEffect, useRef } from "react";
import { mainContext } from "../../../pages/_app";

const sample_completion_provider = {
  display: ["flex", "block", "grid"],
  alignItems: ["flex-start", "center", "flex-end"],
  justifyContent: ["flex-start", "center", "flex-end"],
};

export default function MonacoEditor({
  disableGuide = false,
  readOnly = false,
  value,
  completionProvider = {},
  defaultLanguage = "json",
  onChange,
  onCtrlS,
}) {
  const theme = useTheme();
  const providerRef = useRef(null); // Store the provider reference

  // Cleanup the completion provider when the component unmounts
  useEffect(() => {
    return () => {
      if (providerRef.current) {
        providerRef.current.dispose();
      }
    };
  }, []);

  function onMonacoMount(editor, monaco, completionData) {
    // Add custom command for Tab key
    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, // Ctrl + S
      () => {
        const currentValue = editor.getValue();
        onCtrlS && onCtrlS(JSON.parse(currentValue).css);
      }
    );
    // Set the base theme based on MUI theme mode
    const baseTheme = theme.palette.mode === "dark" ? "vs-dark" : "vs";
    monaco.editor.defineTheme("myCustomTheme", {
      base: baseTheme, // Can also be 'vs-dark' or 'hc-black'
      inherit: true, // Can inherit from another theme
      rules: [
        // You can add more rules here as needed
        { token: "", background: theme.palette.background.default }, // Static background color
      ],
      colors: {
        "editor.background": theme.palette.background.default, // Static background color
      },
    });

    // Set the custom theme
    monaco.editor.setTheme("myCustomTheme");
    // Unregister the previous completion provider if it exists
    if (providerRef.current) {
      providerRef.current.dispose();
    }

    providerRef.current = monaco.languages.registerCompletionItemProvider(
      "json",
      {
        provideCompletionItems: (model, position) => {
          var textUntilPosition = model
            .getValueInRange({
              startLineNumber: 1,
              startColumn: 1,
              endLineNumber: position.lineNumber,
              endColumn: position.column,
            })
            .trim();

          const { general, ...others } = completionData;

          let completion = [];
          // Loop through each property in the completion data
          Object.entries(others).forEach(([propName, options]) => {
            const dynamicPropRegex = new RegExp(
              `"${propName}"\\s*:\\s*"([^"]*)?$`
            );
            const isPropMatch = textUntilPosition.match(dynamicPropRegex);
            if (isPropMatch) {
              // Add the matching property suggestions to the completion list
              completion = options;
            }
          });

          // Define the range correctly for the current position
          const word = model.getWordUntilPosition(position);
          const range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
          };

          // If no specific property matches, provide the general suggestions
          if (completion.length === 0) {
            completion = general.map((item) => ({
              ...item,
              range, // Ensure range is applied correctly
            }));
          } else {
            completion = completion.map((item) => ({
              ...item,
              range, // Ensure range is applied to each suggestion
            }));
          }
          return {
            suggestions: completion,
          };
        },
      }
    );
  }

  // Add the command line to the value
  const initialValue = JSON.stringify(
    disableGuide
      ? value
      : {
          _instructions: "Press Ctrl + S to save",
          css: value, // Your actual JSON data goes here
        },
    null,
    2
  );

  return (
    <Editor
      theme={`vs-${theme.palette.mode}`}
      height="100%"
      defaultLanguage={defaultLanguage}
      value={initialValue}
      options={{
        wordWrap: "on", // Enable word wrapping
        lineNumbers: "off",
        minimap: {
          enabled: false, // Disable the mini map
        },
        readOnly: readOnly,
        scrollBeyondLastLine: false,
      }}
      onChange={(value) => {
        onChange && onChange(JSON.parse(value).css);
      }}
      onMount={(editor, monaco) => {
        return onMonacoMount(
          editor,
          monaco,
          completionCreate(completionProvider)
        );
      }}
    />
  );
}

const completionCreate = (completionProvider) => {
  const general = Object.keys(completionProvider).map((key) => {
    return {
      label: `"${key}"`,
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: `"${key}": "\${1}"`,
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    };
  });
  const props = Object.entries(completionProvider).reduce((res, cur) => {
    const prop = cur[0];
    const options = cur[1].map((option) => {
      return {
        label: option,
        kind: monaco.languages.CompletionItemKind.Value,
        insertText: option,
      };
    });
    res[prop] = options;
    return res;
  }, {});
  return {
    general: general,
    ...props,
  };
};
