import {object, number, string, TypeOf} from "zod"

const payload = {
    body: object({
        title: string({required_error: "Title is required"}),
        description: string({required_error: "Description is required"})
        .min(50, "Description should be at least 50 characters long"),

    })
}

const params = {
    params: object({
        id: string({required_error: "id is required"})
    })
}


export const createTaskSchema = object({
    ...payload
})

export const updateTaskSchema = object({
    ...payload,
    ...params
})

export const deleteTaskSchema = object({
    ...params
})


export type CreateTaskInput = TypeOf<typeof createTaskSchema>
export type UpdateTaskInput = TypeOf<typeof updateTaskSchema>
export type DeleteTaskInput = TypeOf<typeof deleteTaskSchema>
