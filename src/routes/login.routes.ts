import { Router } from "express";
import loginController from "../controllers/login.controller"
import schemaValidationMiddleware from "../middlewares/schemaValidation.middleware";
import { loginSchema } from "../schemas/login.schema";

const loginRouter = Router()
loginRouter.post("", schemaValidationMiddleware(loginSchema), loginController)

export default loginRouter