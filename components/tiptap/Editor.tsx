"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface Props {
  name: string;
  defaultValue?: string;
}

const TOOLBAR = [
  { cmd: "bold",         label: "B",   className: "font-bold" },
  { cmd: "italic",       label: "I",   className: "italic" },
  { cmd: "heading-2",    label: "H2",  className: "" },
  { cmd: "heading-3",    label: "H3",  className: "" },
  { cmd: "bulletList",   label: "•—",  className: "" },
  { cmd: "orderedList",  label: "1.",  className: "" },
  { cmd: "blockquote",   label: '"',   className: "" },
  { cmd: "horizontalRule", label: "—", className: "" },
];

export default function Editor({ name, defaultValue }: Props) {
  let initialContent: object | undefined;
  if (defaultValue) {
    try {
      initialContent = JSON.parse(defaultValue);
    } catch {
      initialContent = undefined;
    }
  }

  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent,
    editorProps: {
      attributes: {
        class:
          "min-h-[300px] outline-none prose-zeg font-worksans text-[0.9375rem] leading-[1.8] text-navy-100 p-5 focus:outline-none",
      },
    },
  });

  const execCmd = (cmd: string) => {
    if (!editor) return;
    const chain = editor.chain().focus();
    switch (cmd) {
      case "bold":          chain.toggleBold().run(); break;
      case "italic":        chain.toggleItalic().run(); break;
      case "heading-2":     chain.toggleHeading({ level: 2 }).run(); break;
      case "heading-3":     chain.toggleHeading({ level: 3 }).run(); break;
      case "bulletList":    chain.toggleBulletList().run(); break;
      case "orderedList":   chain.toggleOrderedList().run(); break;
      case "blockquote":    chain.toggleBlockquote().run(); break;
      case "horizontalRule": chain.setHorizontalRule().run(); break;
    }
  };

  const json = editor ? JSON.stringify(editor.getJSON()) : defaultValue ?? "{}";

  return (
    <div className="border border-navy-700 bg-paper focus-within:border-brass-500 transition-colors">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border-b border-navy-800">
        {TOOLBAR.map((btn) => (
          <button
            key={btn.cmd}
            type="button"
            onClick={() => execCmd(btn.cmd)}
            className={`px-2.5 py-1 text-xs text-navy-300 hover:text-paper hover:bg-navy-800 transition-colors ${btn.className}`}
          >
            {btn.label}
          </button>
        ))}
      </div>
      {/* Editor area */}
      <EditorContent editor={editor} />
      {/* Hidden JSON value submitted with form */}
      <input type="hidden" name={name} value={json} readOnly />
    </div>
  );
}
