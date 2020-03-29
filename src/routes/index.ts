import express, { Router, Request, Response } from "express";

const router: Router = express.Router();

router.get("/", (_reqesut: Request, response: Response) => {
  response.json({
    success: true,
    data: "home"
  });
});

export default router;
