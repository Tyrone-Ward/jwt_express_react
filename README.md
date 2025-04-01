# JWT Authentication with Express and React

This project demonstrates a full-stack application implementing JSON Web Token (JWT) authentication using an Express.js backend and a React frontend.

## Features

- **User Authentication**: Secure user signup and login functionality using JWT.
- **Protected Routes**: Access control for specific routes based on user authentication status.
- **State Management**: Efficient state handling in the React application.

## Technologies Used

- **Backend**:

  - [Express.js](https://expressjs.com/): Web framework for Node.js.
  - [JSON Web Tokens (JWT)](https://jwt.io/): For secure authentication.
  - [Sequelize](https://sequelize.org/): modern TypeScript and Node.js ORM.

- **Frontend**:
  - [React](https://reactjs.org/): JavaScript library for building user interfaces.
  - [Zustand](https://zustand.docs.pmnd.rs/): State management library.
  - [Axios](https://axios-http.com/): Promise-based HTTP client for the browser and Node.js.
  - [Tailwind](https://tailwindcss.com/): CSS framework.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Vite](https://vite.dev/)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Tyrone-Ward/jwt_express_react.git
   cd jwt_express_react
   ```

2. **Backend Setup**

   ```bash
   cd server
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../ui
   npm install
   ```

### Configuration

1. **Backend**

   - The postinstall script will automatically populate a JWT secret key and create a .env file

2. **Frontend**
   - Update the API endpoint in the frontend to match the backend URL. This in the .env file in the ./ui directory

### Running the Application

1. **_Start the Backend and Front end_**
   ```bash
   npm start
   ```
   This will start the front end and the backend - running them concurrently.\
   The frontend application will run at http://localhost:5173/ \
   The API server will run at http://localhost:3000/

### Folder Structure

```bash
 jwt_express_react/
 ├── package.json
 ├── README.md
 ├── server
 │   ├── database
 │   ├── env.example
 │   ├── index.js
 │   ├── logs
 │   ├── package.json
 │   ├── README.md
 │   ├── scripts
 │   │   └── setup.js
 │   └── src
 │       ├── config
 │       │   └── index.js
 │       ├── controllers
 │       │   ├── apiController.js
 │       │   ├── authController.js
 │       │   └── index.js
 │       ├── middlewares
 │       │   ├── errorHandler.js
 │       │   └── httpLpgger.js
 │       ├── models
 │       │   └── user.model.js
 │       ├── routes
 │       │   ├── apiRoutes.js
 │       │   ├── authRoutes.js
 │       │   └── rootRoutes.js
 │       ├── services
 │       │   └── user.service.js
 │       └── utils
 │           ├── AppError.js
 │           └── logger.js
 └── ui
     ├── eslint.config.js
     ├── index.html
     ├── package.json
     ├── public
     │   └── vite.svg
     ├── README.md
     ├── src
     │   ├── api
     │   │   └── index.js
     │   ├── App.css
     │   ├── App.jsx
     │   ├── assets
     │   │   └── react.svg
     │   ├── layouts
     │   │   ├── AuthLayout.jsx
     │   │   └── RootLayout.jsx
     │   ├── main.jsx
     │   ├── pages
     │   │   ├── AdminPage.jsx
     │   │   ├── authentication
     │   │   │   ├── LoginPage.jsx
     │   │   │   └── RegisterPage.jsx
     │   │   ├── HomePage.jsx
     │   │   ├── NotFound.jsx
     │   │   └── PublicPage.jsx
     │   └── stores
     │       └── auth
     │           └── auth.store.js
     └── vite.config.js
24 directories, 48 files
```
