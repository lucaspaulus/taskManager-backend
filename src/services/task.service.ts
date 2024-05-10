import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { TaskModel, TaskInput, TaskDocument} from "../models/task.model";

type ListTaskType = "all" | "one"

export async function createTaskService(data: TaskInput): Promise<TaskDocument>{
    return await TaskModel.create(data)
}

export async function listTasksService(
    query: FilterQuery<TaskDocument>, 
    listType: ListTaskType,
    options: QueryOptions = {lean: true}
): Promise<TaskDocument[] | null> {

    if(listType === "all"){
        return await TaskModel.find(query,{}, options)
    }

    return await TaskModel.findOne(query,{}, options)  
}

export async function updateTaskService(
    query: FilterQuery<TaskDocument>, 
    update: UpdateQuery<TaskDocument>, 
    options: QueryOptions): Promise<TaskDocument | null>{
    return await TaskModel.findOneAndUpdate(query, update, options)
}

export async function deleteTaskService(query: FilterQuery<TaskDocument>): Promise<{deletedCount: number}>{
    return await TaskModel.deleteOne(query)
}