# Prompt

API endpoints:

- /api/pet - HTTP methods: GET, POST
- /api/pet/[id] - HTTP methods: GET, PATCH, DELETE

Service: #pet.service.ts
Repository: #pet.repository.ts

For the /api/pet HTTP POST method, /api/pet/[id] - HTTP PATCH, DELETE methods add logic to check if a user is admin user and decline the operation if not.
