---
applyTo: "**/*.ts,**/*.tsx"
description: "Project coding standards for TypeScript and React"
---

# Project coding standards for TypeScript and React

Apply the [general coding guidelines](./general-coding.instructions.md) to all code.

## TypeScript Guidelines
- Use TypeScript for all new code
- Follow functional programming principles where possible
- Use interfaces for data structures and type definitions
- Prefer immutable data (const, readonly)
- Use optional chaining (?.) and nullish coalescing (??) operators

## React Guidelines
- Use functional components with hooks
- Follow the React hooks rules (no conditional hooks)
- Keep components small and focused
- Use the Next.js [<Link /> component](https://nextjs.org/docs/app/api-reference/components/link) for internal navigation
- Use the Next.js [<Image /> component](https://nextjs.org/docs/app/api-reference/components/image) for optimized images.
- If React Component has a property containing complex data, destructure it to create new variables at the beginning of the component body and use those variables in the JSX later. Add default values for them if needed.
- Add `className` to the component properties. Apply this `className` property to the root element of the component.
- Use CSS Modules for component styling.
