BrainStorm

Capture first. Structure later.

BrainStorm is a writing and worldbuilding workspace for keeping story ideas, characters, powers, scenes, and actual writing in one place.

The main idea is simple: you shouldn't have to figure out where an idea belongs before you save it.

A quick idea can start as a Quick Capture and later become a proper Character, World, Power, or Scene. Actual writing stays separate in the World → Story → Chapter structure.

Features
Writing
Worlds and Stories
Chapters with a simple text editor
Chapter ordering
Story-specific references to Characters, Powers, and Scenes
Worldbuilding
Reusable Characters
Reusable Powers
Independent Scenes
World and Story references
Character relationships
Story-specific Character context
Custom Character fields
Quick Capture

Four capture types:

Character
World
Power
Scene

Captures can later be developed into their corresponding entities while keeping the original capture.

How it works

The writing side is intentionally simple:

World
└── Story
    ├── Chapter
    ├── Chapter
    └── Chapter

Characters, Powers, and Scenes aren't owned by a World or Story. They're user-owned entities that can be reused wherever they're needed.

User
├── Worlds
├── Characters
├── Powers
├── Scenes
└── Quick Captures

References connect these entities when they're relevant to a particular World or Story.

This keeps the database from becoming a collection of duplicated Characters and Powers every time they're reused.

Tech Stack

Frontend

React
TypeScript
Vite
Tailwind CSS
React Router

Backend

Node.js
Express
REST API
Zod
JWT
bcrypt

Database

PostgreSQL
Prisma
Architecture
React
  ↓
Express REST API
  ↓
Prisma
  ↓
PostgreSQL

Requests go through authentication, validation, and ownership checks before reaching the database.

Because most entities are reusable, ownership checks are especially important. A client-provided Character or Power ID is never trusted without verifying that it belongs to the authenticated user.

Current Status

BrainStorm is currently being built as a full-stack application.

The initial goal is to get the core system working end-to-end:

Authentication
    ↓
Worlds & Stories
    ↓
Chapters
    ↓
Characters / Powers / Scenes
    ↓
References & Quick Capture
    ↓
Frontend
    ↓
Deployment

Advanced features such as global search, revision history, richer Character context, visual World themes, and media support will come after the core application is stable.

Development

The project is being developed with a focus on learning practical full-stack engineering rather than just getting the application working.

That includes API testing during development, validation and authorization, relational database design, Git/GitHub workflow, deployment, and gradually introducing things such as TypeScript, testing, and CI/CD as the project grows.

Roadmap
MVP

Authentication foundation

World CRUD

Story CRUD

Chapter system

Character system

Power system

Scene system

Quick Capture

Entity relationships

Frontend

Deployment

Later
Advanced Character Context
Character relationship visualization
Advanced Power history
Global search and filtering
World visual identities
Revision history
Media and file attachments
CI/CD
More advanced testing
Project Structure

Documentation for the system model and development plan is kept separately from this README. The README is intended to give a quick overview of the project; detailed design decisions can live in the project documentation.

BrainStorm is a personal project and is currently under active development.
