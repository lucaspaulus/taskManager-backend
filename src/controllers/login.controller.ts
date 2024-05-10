import {Request, Response} from "express"
import loginService from "../services/login.service";

const loginController = async (request: Request, response: Response)=>{
    const {email, password} = request.body
    const loginData = await loginService(email, password)

    return response.status(loginData.statusCode).json(loginData)
    
}

export default loginController