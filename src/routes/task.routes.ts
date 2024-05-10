import { Router } from "express";
import schemaValidationMiddleware from "../middlewares/schemaValidation.middleware";
import verifyAuthTokenMiddleware from "../middlewares/verifyAuthToken.middleware";
import { createTaskSchema, updateTaskSchema, deleteTaskSchema } from "../schemas/task.schema";
import { createTaskController, listAllTasksController, updateTaskController, deleteTaskController} from "../controllers/task.controller";
import checkTaskMiddleware from "../middlewares/checkTask.middleware";
const taskRouter = Router()

taskRouter.post("",  verifyAuthTokenMiddleware, schemaValidationMiddleware(createTaskSchema), createTaskController)
taskRouter.get("", verifyAuthTokenMiddleware , listAllTasksController)
taskRouter.put("/:id",verifyAuthTokenMiddleware, schemaValidationMiddleware(updateTaskSchema), checkTaskMiddleware,  updateTaskController)
taskRouter.delete("/:id",verifyAuthTokenMiddleware, schemaValidationMiddleware(deleteTaskSchema), checkTaskMiddleware, deleteTaskController)

export default taskRouter