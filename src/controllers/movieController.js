import { prisma } from "../config/db.js";

const getAllMovieController = async (req, res) => {
  const movies = await prisma.movie.findMany();

  console.log(movies);

  res.status(200).json({
    status: "success",
    data: movies,
  });
};

const addMovieController = async (req, res) => {
  const { title, overview, releaseYear, genres, runtime } = req.body;

  const movie = await prisma.movie.create({
    data: {
      title,
      overview,
      releaseYear,
      genres,
      runtime,
      createdBy: req.user.id,
    },
  });

  res.status(201).json({
    status: "success",
    data: movie,
  });
};

const getMyMoviesController = async (req, res) => {
  const movie = await prisma.movie.findMany({
    where: {
      createdBy: req.user.id,
    },
  });

  res.status(200).json({
    status: "success",
    data: movie,
  });
};

const editMyMoviesController = async (req, res) => {
  const { title } = req.body;

  const isMovieExist = await prisma.movie.findUnique({
    where: {
      id: req.params.id,
    },
  });

  if (!isMovieExist) {
    return res.status(404).json({
      error: "Movie id not found",
    });
  }

  const isMyMovie = await prisma.movie.findUnique({
    where: {
      id: req.params.id,
      createdBy: req.user.id,
    },
  });

  if (!isMyMovie) {
    return res.status(400).json({
      error: "Not authorized",
    });
  }

  const updatedMovie = await prisma.movie.update({
    where: {
      id: req.params.id,
    },
    data: {
      title: title,
    },
  });

  res.status(201).json({
    status: "success",
    data: updatedMovie,
  });
};

const deleteMyMovieController = async (req, res) => {
  const isMovieExist = await prisma.movie.findUnique({
    where: {
      id: req.params.id,
    },
  });

  if (!isMovieExist) {
    return res.status(404).json({
      error: "Movie dose not exists",
    });
  }

  const isMyMovie = await prisma.movie.findUnique({
    where: {
      id: req.params.id,
      createdBy: req.user.id,
    },
  });

  if (!isMyMovie) {
    return res.status(400).json({
      error: "Not authorized",
    });
  }

  await prisma.movie.delete({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json({
    status: "success",
    message: "Movie deleted successfully",
  });
};

export {
  getAllMovieController,
  addMovieController,
  getMyMoviesController,
  editMyMoviesController,
  deleteMyMovieController,
};
