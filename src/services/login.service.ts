import {Response} from "express"
import { UserModel } from "../models/user.model"
import env from "../config/envs"
import jwt from  "jsonwebtoken"
import * as bcrypt from "bcrypt"
import formatResponse from "../utils/formatResponse"

const loginService = async (email: string, password: string) => {
    const user =  await UserModel.findOne({email})
    
    const responseMessage = formatResponse({
        statusCode: 401,
        success: false,
        message: "Wrong email/password"
    })

    if(!user) return responseMessage 
    
    const passwordMatch = bcrypt.compareSync(password, user.password)
    if(!passwordMatch) return responseMessage 

    const token = jwt.sign({id: user._id.toString(), email: user.email}, env.jwtSecretKey, {expiresIn: env.jwtExpirationTime} )

    return formatResponse({
        statusCode: 200,
        success: true,
        data:{
            token,
            userId: user._id.toString(),
            email: user.email
        },
        message: "User logged in successfully.",
    })
}

export default loginService