import {UserModel, UserInput} from "../models/user.model"

const createUserService = async (data: UserInput)=>{
    try {
        const user = await UserModel.create(data)
        const {password, ...userData} = user.toJSON()
        return userData
        
    } catch (e: any) {
        throw new Error(e)
    }
}

export default createUserService