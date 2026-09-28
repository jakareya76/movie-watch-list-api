import express from "express";
import {
  addWatchListController,
  removeMovieFromWatchListController,
} from "../controllers/watchlistController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { addToWatchListSchema } from "../validators/watchlistValidators.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", validateRequest(addToWatchListSchema), addWatchListController);
router.delete("/:id", removeMovieFromWatchListController);

export default router;
