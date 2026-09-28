import { prisma } from "../config/db.js";

const addWatchListController = async (req, res) => {
  const { movieId, status, rating, notes } = req.body;

  const movieExist = await prisma.movie.findUnique({
    where: { id: movieId },
  });

  if (!movieExist) {
    return res.status(404).json({
      error: "movie not found",
    });
  }

  const existingInWatchList = await prisma.watchlistItem.findUnique({
    where: {
      userId_movieId: {
        userId: req.user.id,
        movieId: movieId,
      },
    },
  });

  if (existingInWatchList) {
    return res.status(400).json({
      error: "Movie already in the watch list",
    });
  }

  const watchlistItem = await prisma.watchlistItem.create({
    data: {
      userId: req.user.id,
      movieId,
      status: status || "PLANNED",
      rating,
      notes,
    },
  });

  res.status(201).json({
    status: "success",
    data: watchlistItem,
  });
};

const removeMovieFromWatchListController = async (req, res) => {
  const watchlistItem = await prisma.watchlistItem.findUnique({
    where: { id: req.params.id },
  });

  if (!watchlistItem) {
    return res.status(404).json({
      error: "watch list item not found",
    });
  }

  if (watchlistItem.userId !== req.user.id) {
    return res.status(400).json({
      error: "Not allowed to update this watch list item",
    });
  }

  await prisma.watchlistItem.delete({
    where: { id: req.params.id },
  });

  res.status(200).json({
    status: "success",
    message: "Movie removed from the watch list",
  });
};

export { addWatchListController, removeMovieFromWatchListController };
