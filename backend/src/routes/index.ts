import {Router} from "express"

import { likesRouter } from "./likesRouter"

export const routes = Router()

routes.use('/likes', likesRouter)