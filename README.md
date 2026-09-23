# Dev Task — Team & Work Management API

A backend REST API built with **Node.js and Express.js** for managing teams, members, works, and tasks.

This project was developed as part of the **Codveda Internship Program** to demonstrate practical backend development, REST API design, authentication, authorization, data management, and modular server-side architecture.

## Features

### Authentication

* User registration
* User login
* User logout
* Cookie-based authentication
* Protected API routes
* Multiple active login sessions/tokens

### Team Management

* Create teams
* View teams
* View a specific team
* Update team information
* Delete teams
* Team administrator authorization

### Member Management

* Add members to a team
* View team members
* Update member information
* Remove members
* Member role/label information

### Work Management

* Create works
* View all works
* View a specific work
* Update works
* Delete works
* Assign works to team members
* Remove assigned members

### Task Management

* Create tasks under works
* Update tasks
* Delete tasks
* Mark tasks as completed/uncompleted

### Data Persistence

The application currently uses JSON files for data persistence instead of an external database.

Data is stored in:

```text
data/
├── users.json
└── teams.json
```

The application automatically creates these files when they do not exist.

---

## Technologies Used

* **Node.js**
* **Express.js**
* **JavaScript**
* **Cookie Parser**
* **UUID**
* **dotenv**
* **File System API (`fs/promises`)**
* **JSON-based data storage**

---

## Project Structure

```text
dev-task/
│
├── src/
│   ├── controllers/
│   │   ├── member.controller.js
│   │   ├── task.controller.js
│   │   ├── team.controller.js
│   │   ├── user.controller.js
│   │   └── work.controller.js
│   │
│   ├── middlewares/
│   │   └── auth.middleware.js
│   │
│   ├── models/
│   │   ├── team.model.js
│   │   └── user.model.js
│   │
│   ├── routes/
│   │   ├── member.route.js
│   │   ├── task.route.js
│   │   ├── team.route.js
│   │   ├── user.route.js
│   │   └── work.route.js
│   │
│   ├── services/
│   │   └── team.service.js
│   │
│   ├── utils/
│   │   ├── cookies.js
│   │   ├── env.js
│   │   ├── json.js
│   │   └── validate.js
│   │
│   └── app.js
│
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

---

## Authentication Flow

The API uses an HTTP-only cookie to maintain authenticated sessions.

### Registration

```http
POST /api/user/register
```

Example request:

```json
{
  "name": "Abdu",
  "email": "abdselam676@gmail.com",
  "password": "password123"
}
```

### Login

```http
POST /api/user/login
```

The server creates an access token and stores it in an HTTP-only cookie.

### Logout

```http
DELETE /api/user/logout
```

The active authentication token is removed and the cookie is cleared.

Protected endpoints require a valid `access` cookie.

---

## API Endpoints

### User

| Method | Endpoint             | Description     |
| ------ | -------------------- | --------------- |
| POST   | `/api/user/register` | Register a user |
| POST   | `/api/user/login`    | Login           |
| DELETE | `/api/user/logout`   | Logout          |

### Team

| Method | Endpoint            | Description   |
| ------ | ------------------- | ------------- |
| POST   | `/api/team`         | Create a team |
| GET    | `/api/team`         | Get teams     |
| GET    | `/api/team/:teamId` | Get a team    |
| PUT    | `/api/team/:teamId` | Update a team |
| DELETE | `/api/team/:teamId` | Delete a team |

### Members

| Method | Endpoint                      | Description      |
| ------ | ----------------------------- | ---------------- |
| POST   | `/api/member/:teamId`         | Add members      |
| GET    | `/api/member/:teamId`         | Get team members |
| PUT    | `/api/member/:teamId/:userId` | Update a member  |
| DELETE | `/api/member/:teamId`         | Remove members   |

### Works

| Method | Endpoint                                   | Description         |
| ------ | ------------------------------------------ | ------------------- |
| POST   | `/api/work/:teamId`                        | Create a work       |
| GET    | `/api/work/:teamId`                        | Get all works       |
| GET    | `/api/work/:teamId/:workId`                | Get a specific work |
| PUT    | `/api/work/:teamId/:workId`                | Update a work       |
| DELETE | `/api/work/:teamId/:workId`                | Delete a work       |
| PUT    | `/api/work/assign/:teamId/:workId/:userId` | Assign a member     |
| DELETE | `/api/work/assign/:teamId/:workId/:userId` | Remove assignment   |

### Tasks

| Method | Endpoint                                  | Description          |
| ------ | ----------------------------------------- | -------------------- |
| POST   | `/api/task/:teamId/:workId`               | Create a task        |
| PUT    | `/api/task/:teamId/:workId/:taskId`       | Update a task        |
| PUT    | `/api/task/check/:teamId/:workId/:taskId` | Check/uncheck a task |
| DELETE | `/api/task/:teamId/:workId/:taskId`       | Delete a task        |

Returns a simple response to verify that the server is running.

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/abdu-selam/dev-task
```

### 2. Navigate to the project

```bash
cd dev-task
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=3500
NODE_ENV=development
```

### 5. Start the development server

```bash
npm run dev
```

Or start the application normally:

```bash
npm run start
```

The server will run on:

```text
http://localhost:3500
```

---

## Testing the API

You can test the API using tools such as:

* Postman
* Thunder Client
* cURL

A typical workflow is:

```text
Register
   ↓
Login
   ↓
Create Team
   ↓
Add Members
   ↓
Create Work
   ↓
Assign Work
   ↓
Create Tasks
   ↓
Update Task Status
```

---

## Architecture

The project follows a modular backend structure:

```text
Request
   ↓
Route
   ↓
Middleware
   ↓
Controller
   ↓
Model / Service
   ↓
JSON Storage
```

### Controllers

Controllers handle HTTP requests, validate input, check authorization, and return API responses.

### Routes

Routes define the API endpoints and connect them to their corresponding controllers.

### Middleware

Authentication middleware protects private endpoints and identifies the currently authenticated user.

### Models

Models handle application data and persistence logic.

### Services

Services contain reusable data-processing and formatting logic.

### Utilities

Utility modules provide reusable functionality such as:

* Cookie handling
* Environment variables
* JSON file operations
* Input validation

---

## Authorization

Team operations are restricted to the team administrator.

For example, only the team administrator can:

* Update a team
* Delete a team
* Add or remove members
* Create and modify works
* Assign works
* Manage tasks

This ensures that protected team resources cannot be modified by unauthorized users.

---

## Data Storage

For simplicity, this project uses local JSON files instead of a database.

This makes the project easy to run locally without requiring additional database configuration.

The storage layer can later be replaced with a MongoDB database

without changing the overall API structure significantly.

---

## Internship Learning Objectives

This project demonstrates practical experience with:

* REST API development
* Node.js backend development
* Express.js
* HTTP methods and status codes
* Authentication
* Authorization
* Cookies
* Middleware
* Modular project architecture
* CRUD operations
* Data validation
* File-based persistence
* UUID-based identifiers
* Error handling
* API endpoint design
* Git and GitHub project workflow

---

## Future Improvements

Possible improvements for future versions include:

* Replace JSON storage with MongoDB
* Hash passwords using bcrypt
* Use JWT access and refresh tokens
* Add a frontend dashboard
* Add deployment configuration

---

## Author

**Abdu Selam**

Computer Science Student | MERN Stack Developer

GitHub: `https://github.com/abdu-selam`

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for more information.
