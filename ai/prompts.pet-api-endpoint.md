# Prompt

API endpoints:

- /api/pets - HTTP methods: GET, POST
- /api/pets/[id] - HTTP methods: GET, PATCH, DELETE

Service: #pet.service.ts
Repository: #pet.repository.ts

For the /api/pets HTTP POST method, /api/pets/[id] HTTP PATCH, DELETE methods add logic to check if a user is admin user and decline the operation if not.
