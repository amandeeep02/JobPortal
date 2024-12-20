# Job Portal

This project is a job portal application built with a React frontend and an Express backend. It allows users to search for jobs, apply for jobs, and manage job listings.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB

## Environment Variables

### Backend

Create a `.env` file in the `server` directory with the following content:

```sh
MONGODB_URI=<your_mongodb_uri> PORT=5000
JWT_SECRET=<your_jwt_secret>
REACT_APP_BASE_URL=https://job-portal-three-bice.vercel.app
NODE_ENV=development

GOOGLE_API_KEY=<your_google_api_key>
GOOGLE_PROJECT_ID=<your_google_project_id>
```

Make sure to replace placeholders like `<your_mongodb_uri>`, `<your_jwt_secret>`, `<your_google_api_key>`, and `<your_google_project_id>` with your actual values.

### Frontend

Create a `.env.development` file in the `client` directory with the following content:

```sh
VITE_SERVER_URL=https://job-portal-helper.vercel.app
VITE_CLIENT_URL=https://job-portal-three-bice.vercel.app
```

Create a `.env.production` file in the `client` directory with the following content:

```sh
VITE_SERVER_URL=https://job-portal-helper.vercel.app
VITE_CLIENT_URL=https://job-portal-three-bice.vercel.app
```

## Running the Backend Server

1. Navigate to the `server` directory:

```sh
cd server
```

2. Install the dependencies:

```sh
npm install
```

3. Start the server:

```sh
npm start
```

The backend server will be running on https://job-portal-helper.vercel.app.

## Running the React App

1. Navigate to the client directory:

```sh
cd client
```

2. Install the dependencies:

```sh
npm install
```

3. Start the development server:

```sh
npm run dev
```

## Project Structure:

```markdown
client/
.env.development
.env.production
.eslintrc.cjs
.gitignore
.prettierignore
.prettierrc
.vercel/
project.json
README.txt
components.json
index.html
package.json
postcss.config.js
prettier.config.js
public/
fonts/
robots.txt
site.webmanifest
README.md
src/
App.tsx
components/
context/
data/
...
tailwind.config.js
tsconfig.json
tsconfig.node.json
vercel.json
vite.config.ts
server/
.env
.gitignore
package.json
src/
...
tsconfig.json
```

Make sure to replace placeholders like `<your_mongodb_uri>`, `<your_jwt_secret>`, `<your_google_api_key>`, and `<your_google_project_id>` with your actual values.
