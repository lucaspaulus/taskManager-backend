import {Request, Response} from "express"
import createUserService from "../services/createUser.service";
import log from "../utils/logger";

const createUserController = async (request: Request, response: Response): Promise<Response> => {
  try {
    const user = await createUserService(request.body)
    return response.status(user.statusCode).json(user)
    
  } catch (e: any) {
        log.error(e)
        return response.status(409).send(e.message)
  }
}

export default createUserController