import {UserModel, UserInput} from "../models/user.model"
import formatResponse from "../utils/formatResponse"

const createUserService = async (data: UserInput)=>{
    try {
        const isUserExists = await UserModel.findOne({email: data.email})
        if (isUserExists){
            return formatResponse({
                statusCode: 403,
                success: false,
                message: "Email already registered"
            })
        }

        const user = await UserModel.create(data)
        const {password, ...userData} = user.toJSON()
        return formatResponse({
            statusCode: 201,
            success: true,
            data: userData,
            message: "User created"
        })
        
    } catch (e: any) {
        throw new Error(e)
    }
}

export default createUserService