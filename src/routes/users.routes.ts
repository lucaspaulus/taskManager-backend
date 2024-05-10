import {Router} from "express"
import createUserController from "../controllers/createUser.controller"
import schemaValidationMiddleware from "../middlewares/schemaValidation.middleware"
import { userSchema } from "../schemas/user.schema"

const userRouter = Router()
userRouter.post("", schemaValidationMiddleware(userSchema), createUserController)

export default userRouter