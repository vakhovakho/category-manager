# Project Instructions

## Prerequisites

Before running the project, ensure the following are installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- Any other required tools or dependencies listed in the `README.md` or `package.json`.

## Setup

1. **Install Dependencies:**
   ```bash
   npm install
   # or if using yarn:
   yarn install
   ```

2. **Configure Environment Variables:**
   - Create a `.env` file in the root of the project.
   - Add the required variables. Use `.env.example` as a template.
     ```
     DATABASE_URL="file:./dev.db"
     PORT=3000
     ```

3. **Set Up the Database (if applicable):**
   ```bash
   npx prisma migrate dev --name init
   ```

## Running the Project

1. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   The server will start and can be accessed at `http://localhost:3000` (or the specified port in `.env`).

## Working endpoints

1. **Create User:**
   ```bash
   POST /users/create
   {
      "email": "test@example.com",
      "categories": [
          1,
          3,
          2
      ]
   }
   ```
1. **Get user:**
   ```bash
   GET /users/{id}
   ```

## Testing

### Run Unit Tests

To execute the unit tests, run:
```bash
npm test
```
