import {Request, Response, NextFunction} from "express"
import { listTasksService } from "../services/task.service"
import formatResponse from "../utils/formatResponse"
import mongoose from "mongoose";
 
const checkTaskMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<Response | void>=> {
    const userId = response.locals.user.id;

    const taskId = request.params.id
    const idValidation = mongoose.Types.ObjectId.isValid(taskId)

    if(!idValidation){
        return response.status(404).json(
            formatResponse({
                statusCode: 404,
                success: false,
                message:"Invalid ID"
            })
        )
    }
    const task = await listTasksService({_id: taskId, user: userId}, "one")

    if(!task){
        return response.status(404).json(
            formatResponse({
                statusCode: 404,
                success: false,
                message:"Task not found"
            })
        )
    }
    return next()
} 

export default checkTaskMiddleware