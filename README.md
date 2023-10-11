# Movies App API
This project is a GraphQL API that fetches data from the [The Movie Database (TMDb)](https://developer.themoviedb.org/reference/intro/getting-started) and from a local PostgreSQL database. It serves as the API for the following application https://github.com/lischetti-lorenzo/movies-app-frontend

# Features

- In order to query the API you must have a user and log in. You can create a user using the ```signUp``` mutation and log in using the ```login``` mutation. When you create a user you must choose one of two roles (```FULL_ACCESS``` or ```READ```). With a full access role you will be able to save movies and tv shows as favorites, while with a read role you will only be able to see and query for movies.
- You can query for popular movies and TV shows using ```popularMovies``` and ```popularTvShows``` queries.
- You can query for specific movies and TV shows by name using ```movies``` and ```tvShows``` queries.
- You can query for one specific movie or TV show to see its details using ```movie``` and ```tvShow``` queries.

ONLY FOR FULL_ACCESS USERS:
- You can query for favorites movies and TV shows using ```favoriteMovies``` and ```favoriteTvShows``` queries.
- You can save a specific movie or TV show as a favorite  using ```likeMovie``` and ```likeTvShows``` mutations.
- You can remove a specific movie or TV show from your favorites using ```unlikeMovie``` and ```unlikeTvShows``` mutations.

# Environment Variables

The application uses environment variables for various purposes, such as configuring the connection to your PostgreSQL database. Therefore, before running the application, make sure to set up the environment variables in the .env file (you can follow the .env.template file as a guide). If any of the environment variables are not configured correctly, the application will not start and will throw an error specifying which environment variables are missing or misconfigured.

# Getting Started

## Run with Docker

### Prerequisites

Before you begin, ensure you have met the following requirements:

Docker: Ensure that you have Docker installed on your system. If you don't have Docker installed, you can download and install it from [Docker's official website](https://www.docker.com/).

### Clone and Run with Docker

To clone and run the project using Docker, follow these steps:

1. Clone the repository to your local machine:
```bash
$ git clone https://github.com/lischetti-lorenzo/movies-app-backend
```

2. Navigate to the project directory:
```bash
$ cd movies-app-backend
```

3. Create a .env file in the root of the project and add the environment variables following the .env.template file.
   
4. Build the Docker container:
```bash
$ docker-compose up
```

5. The API should be running now. You can access the GraphQL Playground at http://localhost:${NODE_PORT}/graphql in your web browser.

### Clone and Run without Docker

If you prefer to run the project without Docker, follow these steps:

1. Clone the repository to your local machine and navigate to the project directory as described in the previous section.

2. Install project dependencies:
```bash
$ npm install
```

3. Create a .env file in the root of the project and add the environment variables following the .env.template file.

4. Run the migrations to create the database schema:
```bash
$ npx prisma migrate dev
```

5. Start the application:
```bash
$ npm run start:dev
```

6. The API should be running now. You can access the GraphQL Playground at http://localhost:${NODE_PORT}/graphql in your web browser.
