const express = require("express");

const app = express();

app.use(express.json());

const movieControllers = require("./controllers/movieControllers");
const validateMovie = require("./middlewares/validateMovie");

app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.post("/api/movies", validateMovie, movieControllers.postMovie);
app.put("/api/movies/:id", validateMovie, movieControllers.putMovie);

const userControllers = require("./controllers/userControllers");
const validateUser = require("./middlewares/validateUser");

app.get("/api/users", userControllers.getUsers);
app.get("/api/users/:id", userControllers.getUsersById);
app.post("/api/users", validateUser, userControllers.postUser);
app.put("/api/users/:id", validateUser, userControllers.putUser);

module.exports = app;
