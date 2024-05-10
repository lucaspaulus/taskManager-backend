import express from "express";
import cors from "cors"
import loginRouter from "./routes/login.routes";
import userRouter from "./routes/users.routes";
import taskRouter from "./routes/task.routes";

function createServer(){
    const app = express()
    app.use(express.json())
    app.use(cors())

    app.use("/api/user", userRouter)
    app.use("/api/login", loginRouter)
    app.use("/api/task", taskRouter)

    return app
}

export default createServer