import {object, string} from "zod"

export const loginSchema = object({
    body: object({
        email: string({required_error: "Name is required"}).email({message:"Invalid email address"}),
        password: string({required_error: "Password is required"}).min(8, 'Password must be at least 8 characters')
    })
})