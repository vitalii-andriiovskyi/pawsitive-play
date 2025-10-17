---
applyTo: "**"
---
# Project general coding standards

## Naming Conventions
- Use PascalCase for component names, interfaces, and type aliases
- Use camelCase for variables, functions, and methods
- Prefix private class members with underscore (_)
- Use ALL_CAPS for constants

## Error Handling
- Use try/catch blocks for async operations
- Always log errors with contextual information

## File Import/Export
- Use absolute imports for project files starting from the root directory with preceeding `@`. Here is an example `import delay from "@/shared/utils/delay";`