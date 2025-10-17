---
applyTo: "**/*.ts,**/*.tsx"
---

# Project Architecture

## Structure

```bash
/my-app
  ├── /app             # Application router for next.js
  │   ├── /api         # for api in next.js
  │   │   ├── /pets        
  │   │   │   ├── route.ts   
  │   │   │   ├── /[id]
  │   │   │   │   ├── route.ts
  │   │   ├── /products        
  │   │   │   ├── route.ts   
  │   │   │   ├── /[id]
  │   │   │   │   ├── route.ts
  │   ├── /(pages)         # for main pages in next.js
  │   │   ├── layout.tsx   # layout
  │   │   ├── page.tsx     # homepage
  ├── /public
  ├── /front-end
  │   ├── /features        # Each domain entity has its own folder
  │   │   ├── /user
  │   │   │   ├── /domain                  # Business model and data access logic
  │   │   │   │   ├── user.model.ts        # Business model (pure JS/TS)
  │   │   │   │   ├── user.repository.ts   # Data access from store (Redux, Firebase). Persistence logic. It has methods like
  │   │   │   │   │                       # getById, getAll, updateOne, removeOne, removeMany, etc.
  │   │   │   ├── /infrastructure          # all about REST, GraphQL, and data transformation (DTO)
  │   │   │   │   ├── user.api.ts          # API interactions (REST/GraphQL) - just requests to the server (GET, POST, PUT, DELETE)
  │   │   │   │   ├── user.dto.ts          # Data transform object model got from third party API | only needed if DTO differs
  │   │   │   │   │                       # from domain model
  │   │   │   │   ├── user.transform.ts    # Functions that transform DTO to domain model | only needed if DTO differs 
  │   │   │   │   │                        # from domain model
  │   │   │   │   ├── user.service.ts      # Functions that transform input data, use methods from `user.api.ts` 
  │   │   │   │   │                        # to make request to the server, and transform response data to domain model 
  │   │   │   │   │                       # using `user.transform.ts` functions | it not always needed
  │   │   │   ├── /use-cases               # Logic related to application (framework) (use cases). It has to be done via SWR library.
  │   │   │   │   ├── user.swr.keys.ts     # Keys for SWR to identify each resource (like `getUserSWRKey`, `getUsersSWRKey`, etc). 
  │   │   │   │   ├── user.usecases.ts     # Business logic (use cases). It has to be done via SWR library. It has react hooks 
  │   │   │   │   │                        #   that call methods from `user.service.ts` or `user.api.ts`. 
  │   │   │   │   │                       #  There could be folder `use-cases` instead of this file. 
  │   │   │   │   │                       #  It should contain specific use cases: `use-user`, `use-create-user` etc.
  │   │   │   ├── /components          # UI Components related to User
  │   │   │   │   ├── /user-card
  │   │   │   │   │   ├── UserCard.tsx
  │   │   │   │   ├── /user-form
  │   │   │   │   │   ├── UserForm.tsx
  │   │   │   ├── index.ts             # Barrel export for easy imports
  │   ├── /components                  # Generic, reusable UI components
  │   │   ├── /home                    # Homepage related components. They usually have content and don't deal with any domain logic
  │   │   │   ├── /hero-section
  │   │   │   │   ├── HeroSection.tsx
  │   │   │   │   ├── HeroSection.module.css # it can be if tailwindcss is not applicable
  │   │   │   ├── /feature-block
  │   │   │   │   ├── FeatureBlock.tsx
  │   │   │   ├── /testimonial-section
  │   │   │   │   ├── TestimonialSection.tsx
  │   │   │   ├── /call-to-action
  │   │   │   │   ├── CallToAction.tsx
  │   │   ├── /core                    # For unique components
  │   │   │   ├── /header
  │   │   │   │   ├── Header.tsx
  │   │   │   ├── /footer
  │   │   │   │   ├── Footer.tsx
  │   │   ├── /layout                  # For more complex layout components or put in /core
  │   │   │   ├── /container
  │   │   │   │   ├── Container.tsx
  │   │   │   ├── /grid
  │   │   │   │   ├── Grid.tsx
  │   │   │   └── ...
  │   │   ├── /shared                  # For basic, reusable UI elements or shared components
  │   │   │   ├── Input.tsx
  │   │   │   ├── /button
  │   │   │   │   ├── Button.tsx
  │   ├── /hooks           # Shared custom hooks (useFetch): useWindowDimentions, useDebounce, .etc
  │   ├── /utils           # Utilities (isSafari, isMobile), helpers (NO usually they are handle domain logic), constants
  │   ├── /theme           # CSS theme customization in the case of using components library like PrimeReact, etc.
  ├── /back-end
  │   ├── /features        # Each domain entity has its own folder
  │   │   ├── /user
  │   │   │   ├── user.model.ts        # database model (MongoDB, Firebase, POSTGres, etc)
  │   │   │   ├── user.repository.ts   # Data access to db model with basic methods like getById, getAll, updateOne, removeOne, removeMany, etc.
  │   │   │   ├── user.service.ts      # Service with complex logic, validations, can use many repositories
  │   ├── /utils           # contains utilities only on the BE side, usually they are  pure simple functions
  │   ├── /lib             # library with more complex logic than utitilies: CustomError, ApiClient, etc
  │   │   ├── dbConnect.ts # connection to DB
  │   │   ├── auto-increment-mongoose.ts 
  ├── /shared             # files to be used in across the project
  │   ├── /constants      # constants
  │   ├── /utils          # utilities - usually pure simple functions
  │   ├── /lib            # library with more complex logic than utitilies: CustomError, ApiClient, etc
  │   ├── /features       # everything that has data structure: image, seo, etc. 
  │   │   │                # There could be no domain logic here (functions that    work with data, validations, etc).
  │   │   ├── /user
  │   │   │   ├── /domain                  # Business model and data access logic
  │   │   │   │   ├── user.model.ts        # Business model (pure JS/TS)
  │   │   │   │   ├── user.repository.ts   # Class with methods or just functions to work with user data. It has methods like
  │   │   │   │   │                       # getById, getAll, updateOne, removeOne, removeMany, etc.   
  │   │   │   ├── /validation-schemas      # next.js only, to validate form inputs on FE and in backend API endpoints. 
  │   │   │   │   │                        # Partially actions can reduce their logic. Only on BE.  
  │   │   │   │   ├── user.sign-up.schema.ts        # Business model (pure JS/TS)
  ├── /config      
  │   ├── config.ts       # file that has configuration options. It consumes process.env. variables for BE and app folder only. 
  │   │                   # Not to import in FE
  ├── package.json
  ├── README.md
```

In the case of next.js, the folders `/front-end/features/<feature-name>/use-cases` and `/front-end/features/<feature-name>/infrastructure` 
can be ommited, because data can be fetched directly in the server components or in the pages. 
These folders are needed only for user feature or features that depend on the latest user data, 
or when we need functionality that allows a user to interact with the feature data in a specific way (like creating, updating, deleting, etc.).
When we have the folders `/front-end/features/<feature-name>/use-cases` and `/front-end/features/<feature-name>/infrastructure`, 
we implement this approach: 
- server components fetches data on the server side, and passes it to the client side, via SWR fallback property. 
- client side uses SWR to use fallback, to revalidate data by fetching data from the server, and to update the data on the client side.