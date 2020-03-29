import express, { Router, Request, Response, NextFunction } from "express";
import { INTERNAL_SERVER_ERROR } from "http-status-codes";
import createError from "http-errors";
import { User } from "../model";
const router: Router = express.Router();
// 获取所有用户 GET /users
router.get(
  "/",
  async (_request: Request, response: Response, next: NextFunction) => {
    try {
      const users = await User.findAll();
      response.json({
        success: true,
        data: users
      });
    } catch (e) {
      next(e);
    }
  }
);

// 获取某个用户 GET /users/:id
router.get(
  "/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = request.params.id;
      const user = await User.findByPk(id);
      response.json({
        success: true,
        data: user
      });
    } catch (e) {
      next(e);
    }
  }
);
// 添加一个用户 POST /users
router.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      let user = request.body;
      user = await User.create(user);
      response.json({
        success: true,
        data: user
      });
    } catch (e) {
      next(e);
    }
  }
);
// 更新一个用户 POST /users/:id
router.put(
  "/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      let id = request.params.id;
      const updateInfo = request.body;
      let user = await User.findByPk(id);
      if (!user) {
        return next(createError(INTERNAL_SERVER_ERROR));
      }
      user = await user.update(updateInfo);
      response.json({
        success: true,
        data: user
      });
    } catch (e) {
      next(e);
    }
  }
);

// 删除一个用户 POST /:id
router.delete(
  "/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      let id = request.params.id;
      let user = await User.findByPk(id);
      if (!user) {
        return next(createError(INTERNAL_SERVER_ERROR));
      }
      user = await user.destroy(); // delete from users where id = ?
      response.json({
        success: true,
        data: user
      });
    } catch (e) {
      next(e);
    }
  }
);
export default router;
