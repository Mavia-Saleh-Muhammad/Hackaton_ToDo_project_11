---
name: frontend-component-ui
description: Build reusable, state-driven React components and manage UI logic efficiently.
---

# Frontend Component & State Management Skill

## Responsibilities

- Build **reusable React components** for buttons, forms, modals, cards, and lists.
- Manage **component state** using React hooks (`useState`, `useEffect`, `useContext`, or Redux if needed).
- Implement **conditional rendering** and dynamic content updates.
- Handle **user interactions** like clicks, form submissions, and hover effects.
- Optimize components to **avoid unnecessary re-renders**.
- Integrate **API data** into components and update UI accordingly.
- Ensure **responsive behavior** across all devices.
- Follow **design system and Tailwind CSS** standards for consistent styling.

## Best Practices

- Keep components **small, single-responsibility, and reusable**.
- Use **prop-types or TypeScript types** for validation.
- Handle **loading, error, and empty states** gracefully.
- Avoid inline styles; use **Tailwind CSS classes or CSS modules**.
- Separate **UI and logic** to improve maintainability.
- Use **React DevTools** to debug performance and state issues.

## Example Structure

```tsx
import React, { useState } from "react";

type TodoItemProps = {
  title: string;
  completed: boolean;
};

export default function TodoItem({ title, completed }: TodoItemProps) {
  const [isDone, setIsDone] = useState(completed);

  const toggleDone = () => setIsDone(!isDone);

  return (
    <div
      className={`p-4 border rounded-md flex justify-between items-center ${
        isDone ? "bg-green-100" : "bg-white"
      }`}
    >
      <span className={isDone ? "line-through text-gray-500" : ""}>{title}</span>
      <button
        onClick={toggleDone}
        className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
      >
        {isDone ? "Undo" : "Complete"}
      </button>
    </div>
  );
}
```
