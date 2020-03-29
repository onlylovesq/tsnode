import express, { Express, Request, Response, NextFunction } from "express";
import createError from "http-errors";
import { NOT_FOUND, INTERNAL_SERVER_ERROR } from "http-status-codes";
// import logger from "morgan";
import indexRouter from "./routes/index";
import usersRouter from "./routes/users";

const app: Express = express();
// app.use(logger("dev")); // 打印请求日志
app.use(express.json()); // 解析JSON格式的请求体 这样就可以在req.body中直接拿到解析好的请求体了
app.use(express.urlencoded({ extended: true })); // 解析表单格式的请求 req.body直接拿数据
app.use("/", indexRouter);
app.use("/users", usersRouter);
// 如果没有匹配到路由
app.use((_req: Request, _res: Response, next: NextFunction) => {
  next(createError(NOT_FOUND));
});
app.use((error: any, _req: Request, res: Response, _next: NextFunction) => {
  res.status(error.status || INTERNAL_SERVER_ERROR);
  res.json({
    success: false,
    error
  });
});

export default app;
