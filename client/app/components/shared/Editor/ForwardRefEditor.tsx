"use client";

import {
  BoldItalicUnderlineToggles,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  MDXEditorMethods,
  MDXEditorProps,
  quotePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
} from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import { forwardRef } from "react";

// ForwardRefEditor.tsx

// This is the only place InitializedMDXEditor is imported directly.
const Editor = dynamic(() => import("./InitializedMDXEditor"), {
  // Make sure we turn SSR off
  ssr: false,
});

// This is what is imported by other components. Pre-initialized with plugins, and ready
// to accept other props, including a ref.
export const ForwardRefEditor = forwardRef<MDXEditorMethods, MDXEditorProps>(
  (props, ref) => (
    <Editor
      {...props}
      plugins={[
        // Example Plugin Usage
        toolbarPlugin({
          toolbarContents: () => (
            <>
              {" "}
              <UndoRedo />
              <BoldItalicUnderlineToggles />
            </>
          ),
        }),
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
      ]}
      editorRef={ref}
    />
  )
);

// TS complains without the following line
ForwardRefEditor.displayName = "ForwardRefEditor";
