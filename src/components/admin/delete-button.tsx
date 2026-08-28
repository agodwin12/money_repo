"use client";

import { Trash2 } from "lucide-react";

export function DeleteButton({
  action,
  label = "Delete",
  confirmText = "Delete this item? This cannot be undone.",
  iconOnly = false,
}: {
  action: () => Promise<void>;
  label?: string;
  confirmText?: string;
  iconOnly?: boolean;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm(confirmText)) e.preventDefault();
      }}
    >
      <button
        type="submit"
        aria-label={label}
        className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-950/30"
      >
        <Trash2 className="h-4 w-4" />
        {!iconOnly && label}
      </button>
    </form>
  );
}
