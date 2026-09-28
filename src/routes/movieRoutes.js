import express from "express";
import {
  deleteMyMovieController,
  addMovieController,
  editMyMoviesController,
  getAllMovieController,
  getMyMoviesController,
} from "../controllers/movieController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getAllMovieController);
router.get("/my", getMyMoviesController);
router.put("/my/:id", editMyMoviesController);
router.delete("/my/:id", deleteMyMovieController);

router.post("/", addMovieController);

export default router;
