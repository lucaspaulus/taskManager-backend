import mongoose  from "mongoose";
import bcrypt from "bcrypt"
import env from "../config/envs"


export interface UserInput{
    name: string;
    email: string;
    password: string;
}

export interface UserDocument extends UserInput, mongoose.Document{
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>
}

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}

},{
    timestamps: true
})

userSchema.pre("save", function(next: mongoose.CallbackWithoutResultAndOptionalError){
    const user = this as UserDocument

    if(!user.isModified){
        next()
    }

    const salt = bcrypt.genSaltSync(env.bcryptSalt)
    const hash = bcrypt.hashSync(user.password, salt)
    user.password = hash
    return next()
})

userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean>{
    const user = this as UserDocument
    return await bcrypt.compare(candidatePassword, user.password).catch((e)=> false)
}
export const UserModel = mongoose.model<UserDocument>("User", userSchema)

