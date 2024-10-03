import { Editor } from "@monaco-editor/react";
import React from "react";

const sample_completion_provider = {
  display: ["flex", "block", "grid"],
  alignItems: ["flex-start", "center", "flex-end"],
  justifyContent: ["flex-start", "center", "flex-end"],
};

export default function MonacoEditor({
  value,
  completionProvider = [],
  defaultLanguage = "json",
}) {
  const completionCreate = () => {
    return {};
  };

  return (
    <Editor
      theme="vs-dark"
      height="100%"
      defaultLanguage={defaultLanguage}
      value={JSON.stringify(value, null, 2)}
      options={{
        wordWrap: "on", // Enable word wrapping
        lineNumbers: "off",
        minimap: {
          enabled: false, // Disable the mini map
        },
        scrollBeyondLastLine: false,
      }}
      onChange={(value) => {
        // setParamInput(JSON.parse(value));
      }}
      onMount={onMonacoMount}
    />
  );
}

function createDependencyProposals(range) {
  // returning a static list of proposals, not even looking at the prefix (filtering is done by the Monaco editor),
  // here you could do a server side lookup
  return [
    {
      label: '"display"',
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: "The Lodash library exported as Node.js modules.",
      insertText: '"display": "${1:}"',
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      range: range,
    },
  ];
}
function createDisplayValueProposals(range) {
  return [
    {
      label: "block",
      kind: monaco.languages.CompletionItemKind.Value,
      documentation: "Displays an element as a block element.",
      insertText: "block",
      range: range,
    },
    {
      label: "flex",
      kind: monaco.languages.CompletionItemKind.Value,
      documentation: "Displays an element as a flexible box.",
      insertText: "flex",
      range: range,
    },
    {
      label: "grid",
      kind: monaco.languages.CompletionItemKind.Value,
      documentation: "Displays an element as a grid container.",
      insertText: "grid",
      range: range,
    },
    {
      label: "inline",
      kind: monaco.languages.CompletionItemKind.Value,
      documentation: "Displays an element as an inline element.",
      insertText: "inline",
      range: range,
    },
  ];
}

function onMonacoMount(editor, monaco) {
  monaco.languages.registerCompletionItemProvider("json", {
    provideCompletionItems: (model, position) => {
      var textUntilPosition = model
        .getValueInRange({
          startLineNumber: 1,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column,
        })
        .trim();
      // Match to see if we are inside the "display" property's value context
      const valueMatch = textUntilPosition.match(/"display"\s*:\s*"([^"]*)?$/);

      if (valueMatch) {
        return { suggestions: createDisplayValueProposals(range) };
      }
      var word = model.getWordUntilPosition(position);
      var range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };
      return {
        suggestions: createDependencyProposals(range),
      };
    },
  });
}
