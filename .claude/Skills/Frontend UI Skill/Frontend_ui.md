---
name: frontend-ui
description: Build responsive, modern, and high-performance user interfaces for web applications. Focus on user experience and visual appeal.
---

# Frontend UI Skill

## Responsibilities

- Create responsive layouts using Next.js and Tailwind CSS.
- Implement landing pages, dashboards, forms, and task views.
- Optimize rendering performance and reduce unnecessary re-renders.
- Add interactive elements and animations (fade-in, parallax, hover effects).
- Ensure mobile-first design and cross-browser compatibility.
- Work closely with backend API to display dynamic data seamlessly.
- Apply accessibility best practices (ARIA, keyboard navigation).

## Best Practices

- Keep UI components reusable and modular.
- Use semantic HTML for better SEO and accessibility.
- Limit inline styling; prefer CSS modules or Tailwind classes.
- Optimize images and assets for faster load times.
- Test responsiveness across multiple screen sizes.
- Avoid overloading UI with unnecessary animations or elements.

## Example Structure

```tsx
// Next.js + Tailwind example
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-400 to-purple-600 text-white">
      <h1 className="text-5xl font-bold animate-fade-in">Welcome to TaskMaster</h1>
      <p className="mt-4 text-xl animate-fade-in-delay">Manage your tasks efficiently.</p>
      <button className="mt-6 px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-200 transition">
        Get Started
      </button>
    </section>
  );
}
