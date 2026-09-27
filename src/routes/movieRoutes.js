import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message:
      "Look man, you will get a visa sponsar to Nl, just keep learning and keep building",
  });
});

router.post("/", (req, res) => {
  res.json({
    message:
      "Look man, you will get a visa sponsar to Nl, just keep learning and keep building",
  });
});

export default router;
