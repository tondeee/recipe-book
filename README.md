# Recipe Book Application

A full-stack web application built with Node.js (Nest.js) for the backend and React (Next.js) for the frontend, allowing users to browse and search recipes from TheMealDB API.

## Features

- Browse all available recipes
- Filter recipes by ingredient, country, or category
- View detailed recipe information including ingredients and instructions
- Responsive design with modern UI components using Shadcn UI
- Server-side rendering for better SEO and performance

## Project Structure

The project is separated into two main folders:

- `backend/`: A Nest.js application serving as the API
- `frontend/`: A Next.js application providing the user interface

## Prerequisites

- Node.js (v18 or later)
- npm (v8 or later)
- Docker and Docker Compose (optional, for containerized setup)

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following content:

   ```
   PORT=3001
   MEAL_DB_API_URL=https://www.themealdb.com/api/json/v1/1
   FRONTEND_URL=http://localhost:3000
   ```

4. Start the development server:
   ```bash
   npm run start:dev
   ```

The backend API will be available at `http://localhost:3001`.

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory with the following content:

   ```
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The frontend application will be available at `http://localhost:3000`.

## Docker Setup

You can also run the application using Docker:

1. Make sure you have Docker and Docker Compose installed on your system.

2. From the root directory of the project, run:
   ```bash
   docker-compose up
   ```

This will start both the backend and frontend services in containers:

- Backend will be available at `http://localhost:3001`
- Frontend will be available at `http://localhost:3000`

To stop the containers:

```bash
docker-compose down
```

## API Endpoints

- `GET /api/recipes`: Get all recipes or filter by ingredient, country, or category
  - Query parameters:
    - `ingredient`: Filter recipes by ingredient
    - `country`: Filter recipes by country/cuisine
    - `category`: Filter recipes by category
- `GET /api/recipes/:id`: Get detailed information about a specific recipe

## Technologies Used

### Backend

- Nest.js: Progressive Node.js framework
- TypeScript: Strongly typed JavaScript
- Axios: HTTP client for API requests

### Frontend

- Next.js: React framework with server-side rendering
- React: JavaScript library for building user interfaces
- TypeScript: Strongly typed JavaScript
- Shadcn UI: Beautifully designed components
- Tailwind CSS: Utility-first CSS framework

## Development Tools

- ESLint: Code linting
- Prettier: Code formatting
