To create a comprehensive README that explains each component and how it interacts with the database, including the login functionality, we need to understand the structure and the code of the repository. Here is a template that you can use and adjust based on the actual implementation details in your repository:

---

# iNotebook

iNotebook is a full-featured note-taking web application built with React. This README provides an overview of the project's structure, key components, and how they interact with the backend, including the login functionality.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Getting Started](#getting-started)
4. [Project Structure](#project-structure)
5. [Components Overview](#components-overview)
    - [App Component](#app-component)
    - [Navigation Component](#navigation-component)
    - [Login Component](#login-component)
    - [Signup Component](#signup-component)
    - [Note Component](#note-component)
    - [NoteList Component](#notelist-component)
6. [Backend Interaction](#backend-interaction)
    - [API Endpoints](#api-endpoints)
    - [Database Schema](#database-schema)
7. [Authentication](#authentication)
8. [Running the Project](#running-the-project)

## Features

- User authentication (login and signup)
- Add, edit, and delete notes
- View a list of notes
- Responsive design

## Technologies Used

- **React**: Frontend library for building user interfaces
- **Node.js**: Backend runtime environment
- **Express**: Web framework for Node.js
- **MongoDB**: NoSQL database

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- Yarn or npm
- MongoDB

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/sakshamdani1402/inotebook.git
   ```
2. Navigate to the project directory:
   ```sh
   cd inotebook
   ```
3. Install the dependencies:
   ```sh
   yarn install
   ```

## Project Structure

```
/inotebook
  ├── /public
  ├── /src
  │   ├── /components
  │   │   ├── App.js
  │   │   ├── Navigation.js
  │   │   ├── Login.js
  │   │   ├── Signup.js
  │   │   ├── Note.js
  │   │   ├── NoteList.js
  │   ├── /services
  │   │   ├── api.js
  │   ├── index.js
  ├── /backend
  │   ├── /models
  │   │   ├── User.js
  │   │   ├── Note.js
  │   ├── /routes
  │   │   ├── auth.js
  │   │   ├── notes.js
  │   ├── server.js
  ├── package.json
  ├── README.md
```

## Components Overview

### App Component

The `App` component is the root component of the application. It sets up the routes and manages the global state.

### Navigation Component

The `Navigation` component provides the navigation bar for the application, including links to the login, signup, and notes pages.

### Login Component

The `Login` component handles user login. It interacts with the backend to authenticate the user and stores the authentication token locally.

### Signup Component

The `Signup` component allows new users to create an account. It sends the user details to the backend to create a new user in the database.

### Note Component

The `Note` component represents a single note. It includes functionality to edit and delete the note.

### NoteList Component

The `NoteList` component displays a list of all notes. It fetches the notes from the backend and renders the `Note` components.

## Backend Interaction

### API Endpoints

- **POST /auth/login**: Authenticates a user and returns a JWT token.
- **POST /auth/signup**: Creates a new user.
- **GET /notes**: Retrieves all notes for the authenticated user.
- **POST /notes**: Creates a new note.
- **PUT /notes/:id**: Updates a note.
- **DELETE /notes/:id**: Deletes a note.

### Database Schema

- **User Schema**:
  ```js
  const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  });
  ```

- **Note Schema**:
  ```js
  const NoteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  });
  ```

## Authentication

Authentication is handled using JSON Web Tokens (JWT). When a user logs in, a token is generated and sent to the client, which stores it locally (e.g., in localStorage). This token is then included in the Authorization header for subsequent requests to protected routes.

### Login Flow

1. User enters their credentials and submits the form.
2. The `Login` component sends a POST request to the `/auth/login` endpoint.
3. The server validates the credentials and responds with a JWT token.
4. The client stores the token and redirects the user to the notes page.

## Running the Project

1. Start the backend server:
   ```sh
   cd backend
   node server.js
   ```
2. Start the frontend development server:
   ```sh
   yarn start
   ```
3. Open [http://localhost:3000](http://localhost:3000) to view the application in the browser.
