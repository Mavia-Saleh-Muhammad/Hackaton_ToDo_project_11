---
name: todo-ui-components
description: Build reusable Todo UI components (list/form/modal) with predictable state, validation, and API integration.
---

# Todo UI Components Skill

## Scope

This skill defines patterns for implementing Todo UI components that are:
- **Reusable** and single-responsibility
- **State-driven** (explicit UI states)
- **API-integrated** (fetch/mutate with consistent error + loading handling)
- **Accessible** (keyboard + screen reader basics)
- **Responsive** (mobile-first)

## Invariants (must always hold)

- Component renders correctly in: **loading**, **success**, **empty**, and **error** states.
- Submit actions must be **idempotent from the UI perspective** (disable button while submitting; prevent double-submit).
- Never trust client-side validation alone—treat it as UX; server errors must be displayed.
- No inline styles; prefer Tailwind classes.

## Non-goals

- Designing a full design system
- Adding global state unless required
- Implementing authentication/authorization flows (handled elsewhere)

## Component set (recommended building blocks)

### 1) `TodoList`
Responsibilities:
- Fetch and display todos
- Handle empty state
- Provide hooks for filtering/sorting (props or local state)

Props (example):
- `todos: Todo[]`
- `onToggleComplete(id)`
- `onEdit(todo)`
- `onDelete(id)`

### 2) `TodoItem`
Responsibilities:
- Render a single todo row
- Toggle completion
- Trigger edit/delete callbacks

### 3) `TodoForm`
Responsibilities:
- Create or update a todo
- Validate title/description
- Handle submit loading and server error

### 4) `TodoModal` (optional)
Responsibilities:
- Present `TodoForm` in a dialog
- Trap focus and close on ESC

## UI State Model (use explicitly)

Use a simple state model and render accordingly:

- `idle` (before initial fetch)
- `loading`
- `success`
- `empty` (success + no items)
- `error` (store message + retry action)

For mutations (create/update/delete):
- `submitting: boolean`
- `submitError: string | null`

## Data fetching patterns

- Prefer colocating fetch in the page/container component.
- Keep presentational components (`TodoList`, `TodoItem`) mostly **pure**.
- Abort in-flight requests in `useEffect` cleanup when applicable.

## Error handling contract (UI)

- Show **human-readable** error text.
- Do not leak stack traces.
- Provide a **Retry** button for list fetch errors.

## Accessibility checklist

- Buttons have discernible text or `aria-label`.
- Inputs have `<label>` or `aria-label`.
- Error messages are announced (e.g., `role="alert"`).
- Modal:
  - `role="dialog"`, `aria-modal="true"`
  - focus moves into modal on open and returns on close

## Tailwind usage

- Mobile-first classes (`sm:`, `md:` as needed)
- Consistent spacing scale (`p-4`, `gap-2`, etc.)
- Keep class lists readable; avoid deeply nested complexity.

## Example: TodoForm (skeleton)

```tsx
import React, { useState } from "react";

type TodoDraft = { title: string; description?: string };

type Props = {
  initial?: TodoDraft;
  onSubmit: (draft: TodoDraft) => Promise<void>;
  submitLabel?: string;
};

export function TodoForm({ initial, onSubmit, submitLabel = "Save" }: Props) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = title.trim().length > 0 && !submitting;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    setError(null);
    try {
      await onSubmit({ title: title.trim(), description: description.trim() || undefined });
    } catch (err) {
      setError("Could not save todo. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="space-y-1">
        <label className="block text-sm font-medium">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md border px-3 py-2"
          placeholder="e.g., Buy milk"
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-md border px-3 py-2"
          rows={3}
        />
      </div>

      {error && (
        <div role="alert" className="text-sm text-red-600">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!canSubmit}
        className="rounded-md bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {submitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
```

## Acceptance checks

- [ ] Components render correctly for loading/success/empty/error
- [ ] Buttons disabled during submit; double-submit prevented
- [ ] Errors are user-friendly and visible
- [ ] Keyboard navigation works (tab order, ESC closes modal if used)
- [ ] Uses Tailwind, no inline styles
