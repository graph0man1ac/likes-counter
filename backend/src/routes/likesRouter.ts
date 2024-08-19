import { Router, Request, Response } from "express"
import LikeController from "../controllers/likeController"
export const likesRouter = Router()

likesRouter.get('/get', LikeController.getLikes)
likesRouter.patch('/update', LikeController.updateLikes)