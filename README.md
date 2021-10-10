<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h2 align="center">Tinder App</h2>

  <p align="center">
  JS Full Stack
    <br />
  </p>
</div>

<!-- ABOUT THE PROJECT -->

# About The Project

### Built With

This project are using:

- [Next.js](https://nextjs.org/)
- [React.js](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [NodeJS Express](https://expressjs.com/)
- [Mongoose ODM](https://mongoosejs.com/)
- [Styled-components](https://styled-components.com/)
- [react hot toast](https://react-hot-toast.com/)

<!-- ROADMAP -->

# Features

- [x] I can see one person at a time to Like or Pass
- [x] If I like someone who already like me, I will get a match
- [x] I can see a person's age in addition to their name and photo
- [x] I can check the list of people I have liked or passed or matched

Notes:

- [x] The current user is a user who is a random user on our backend
- [x] Store that user into localstorage so that when reloading page, we still the same user.

See the [link](https://www.loom.com/share/14f63a0b5b884f5fb1d32247abecfdd6) for a demo

# API

## Endpoints

The table below lists the API endpoints:

| Feature                       | Endpoint                                     |
| ----------------------------- | -------------------------------------------- |
| Get users list                | [GET] `http://localhost:5000/api/user`       |
| Get detail user               | [GET] `http://localhost:5000/api/user/:id`   |
| Mark a user as liked          | [POST] `http://localhost:5000/api/user/like` |
| Mark a user as passed         | [POST] `http://localhost:5000/api/user/pass` |
| Get the list of liked users   | [GET] `http://localhost:5000/api/user/like`  |
| Get the list of passed users  | [GET] `http://localhost:5000/api/user/pass`  |
| Get the list of matched users | [GET] `http://localhost:5000/api/user/match` |
| Get current user              | [GET] `http://localhost:5000/api/user/me`    |

Pagination

There are two parameters to configure pagination:

| name  | Definition                                       |
| ----- | ------------------------------------------------ |
| page  | Indicates the page number, defaults to 1         |
| limit | Indicates the number of per page, defaults to 10 |

For example: `http://localhost:5000/api/user?page=1&limit=10`

<p align="right">(<a href="#top">back to top</a>)</p>

# Setup Project

This is an instruction on setting up your project locally.

### Prerequisites

- MongoDB Compass

### Set up

1. Clone the repo

   ```bash
   git clone https://github.com/your_username_/Project-Name.git
   ```

2. Go to `backend` folder:

   ```bash
   cd backend
   ```

3. Install NPM packages in `backend` folder:

   ```bash
   npm install
   ```

4. Create `.env` file in `backend` folder for backend environments:

   ```text
   PORT=5000
   MONGODB_URI='mongodb://localhost:27017/tinder'
   ```

5. (Only for the first time set up backend) Generate dummy data. It will create 30 users and 10 user relations.

   ```bash
   npm run initDB
   ```

6. Start server backend

   ```bash
   npm run dev
   ```

   Note:

   > You should run script to generate database before starting server backend. We don't have user auth yet, so after generating data users for a database, we just assign the current user to be a random user on our backend.

7. Go to `frontend` folder:

   ```bash
   cd ../frontend
   ```

8. Install NPM packages in `frontend` folder:
   ```bash
   npm install
   ```
9. Create `.env.local` file in `frontend` folder for Frontend environments:
   ```text
   NEXT_PUBLIC_BACKEND_URL=http://localhost:5000/api
   ```
10. Start development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your local browser to see the result.

<p align="right">(<a href="#top">back to top</a>)</p>
