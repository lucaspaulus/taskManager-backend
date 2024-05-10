import {Request, Response, NextFunction} from "express"
import verifyAuthTokenMiddleware from "../middlewares/verifyAuthToken.middleware"
import supertest from "supertest"
import createServer from "../server"
import jwt from "jsonwebtoken"
import {MongoMemoryServer} from "mongodb-memory-server"
import mongoose from "mongoose"
import envs from "../config/envs"
const app = createServer()

jest.mock("../middlewares/verifyAuthToken.middleware", ()=>{
    return jest.fn().mockImplementation((request: Request, response: Response, next: NextFunction)=> {
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
      
    })
})

const token = jest.fn(()=> jwt.sign({ userId: '663ac83cbd0fee2c774df1a8_id_simulado' }, envs.jwtSecretKey))

const newTask = {
    title: "lorem ",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
}

describe("Task", ()=>{
    beforeAll(async ()=>{
        const mongoServer = await MongoMemoryServer.create()
        await mongoose.connect(mongoServer.getUri())
    })

    afterAll(async ()=>{
        await mongoose.disconnect()
        await mongoose.connection.close()
    })

    describe("Testing POST route /api/task", ()=>{
        it("should return a data with status code 200", async ()=> {
            const data = await supertest(app).post(`/api/task`).set('Authorization', 'Bearer ' + token()).send(newTask)
            expect(data.status).toBe(201)
        })
    })
    describe("Testing GET route /api/task", ()=>{
        it("should return a data with status code 200", async ()=> {
            const data = await supertest(app).get(`/api/task`).set('Authorization', 'Bearer ' + token())
            expect(data.status).toBe(200)
        })
    })
})

 