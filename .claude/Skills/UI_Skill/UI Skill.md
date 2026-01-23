---
name: frontend-ui
description: Build modern, responsive, and interactive user interfaces using Next.js, React, and Tailwind CSS.
---

# Frontend UI Skill

## Responsibilities

- Create responsive layouts that work on **mobile, tablet, and desktop**.
- Build **interactive components** (buttons, forms, modals, cards) using React.
- Integrate **animations and transitions** for better user experience.
- Implement **data fetching and state management** for dynamic content.
- Connect frontend with **backend APIs** securely.
- Ensure **accessibility (a11y)** standards are followed.
- Optimize performance: minimize bundle size, lazy-load components, and reduce unnecessary re-renders.
- Maintain **consistent design** using Tailwind CSS and/or component libraries.

## Best Practices

- Follow **mobile-first design** principles.
- Use **semantic HTML** for structure and accessibility.
- Keep components **modular and reusable**.
- Use **Tailwind CSS classes** efficiently to avoid bloat.
- Handle loading states and errors gracefully for API calls.
- Keep UI **consistent with the design system** (colors, spacing, typography).
- Optimize images and assets for faster load times.

## Example Structure

```tsx
// Next.js Hero Section Component Example
import React from "react";

export default function HeroSection() {
  return (
    <section className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
      <h1 className="text-5xl font-bold animate-fade-in">Welcome to Our App</h1>
      <p className="mt-4 text-xl animate-fade-in-delay">
        Build interactive and responsive web apps with ease.
      </p>
      <button className="mt-6 px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition">
        Get Started
      </button>
    </section>
  );
}
