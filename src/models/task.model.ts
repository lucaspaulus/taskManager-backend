import mongoose  from "mongoose";
import { UserDocument } from "./user.model";

export interface TaskInput{
    user: UserDocument["_id"];
    title: string;
    description: string
}

export interface TaskDocument extends TaskInput, mongoose.Document{
    createdAt: Date;
    updatedAt: Date;
}


const taskSchema = new mongoose.Schema({
    user:{type: mongoose.Schema.ObjectId, ref:"User"},
    title: {type: String, required: true},
    description: {type: String, required: true}

},{
    timestamps: true
})

export const TaskModel = mongoose.model<TaskDocument>("Task", taskSchema)