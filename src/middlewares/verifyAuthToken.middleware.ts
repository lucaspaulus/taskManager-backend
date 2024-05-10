import {Request, Response, NextFunction} from "express"
import jwt from "jsonwebtoken"
import envs from "../config/envs"

const verifyAuthTokenMiddleware = (request: Request, response: Response, next: NextFunction): Response | void => {
    let token = request.headers.authorization

    if(!token){
        return response.status(401).json({message: "Missing authorization headers"})
    }

    token = token.split(" ")[1]
    
    try {
        jwt.verify(token, envs.jwtSecretKey, (error)=>{
            if(error){
                return response.status(401).json({message: "Invalid token"})
            }
            response.locals.user = jwt.decode(token)
    
            return next()
        }) 
    } catch (error) {
        return response.status(500).json({message: "Internal server error"})
    }
}

export default verifyAuthTokenMiddleware