import {Request, Response } from "express";
import {createTaskService, listTasksService, updateTaskService, deleteTaskService} from "../services/task.service";
import {CreateTaskInput, UpdateTaskInput, DeleteTaskInput} from "../schemas/task.schema";
import formatResponse from "../utils/formatResponse";

export async function createTaskController(
    request: Request<{}, {}, CreateTaskInput["body"]>, 
    response: Response): Promise<Response>{

    const userId = response.locals.user.id
    const body = request.body

    const newTask = await createTaskService({...body, user: userId})

    return response.status(201).json(
        formatResponse({ 
            statusCode: 201,
            success: true,
            data: newTask ,
            message:"Task created successfully."
        })
    )
}

export async function listAllTasksController(
    request: Request, 
    response: Response): Promise<Response>{
    
    const userId = response.locals.user.id
    const tasks = await listTasksService({user: userId}, "all") 

    if(!tasks || !tasks.length){
        return response.status(404).json(
            formatResponse({
                statusCode: 404,
                success: false,
                message:"The user has no tasks."
            })
        )
    }

    return response.status(200).json(
        formatResponse({
            statusCode: 200,
            success: true,
            data: tasks,
            message:"Data listed successfully."
        })
    )
}

export async function updateTaskController(
    request: Request<UpdateTaskInput["params"]>, 
    response: Response): Promise<Response>{

    const taskId = request.params.id;
    const update = request.body;

    const updatedTask = await updateTaskService({_id:taskId}, update, {new: true})

    return response.status(200).json(
        formatResponse({
            statusCode: 200,
            success: true,
            data: updatedTask,
            message: "Task updated"
        })
    )
}

export async function deleteTaskController(
    request: Request<DeleteTaskInput["params"]>, 
    response: Response): Promise<Response>{

    const taskId = request.params.id;

    await deleteTaskService({_id:taskId})

    return response.status(200).json(
        formatResponse({
            statusCode: 200,
            success: true,
            message: "Task deleted"
        })
    )
}