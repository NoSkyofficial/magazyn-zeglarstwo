"use client";

import { useRef } from "react";

export default function DeleteIssueButton({ action }: { action: () => Promise<void> }) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form ref={formRef} action={action}>
      <button
        type="button"
        className="section-label text-red-500 hover:text-red-400 border border-red-900 hover:border-red-700 px-3 py-1.5 transition-colors"
        onClick={() => {
          if (confirm("Usunąć ten numer?")) {
            formRef.current?.requestSubmit();
          }
        }}
      >
        Usuń
      </button>
    </form>
  );
}
