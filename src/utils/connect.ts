import mongoose  from "mongoose";
import env from "../config/envs"
import log from "./logger";

async function connect(): Promise<void>{
    try {
        await mongoose.connect(env.dbURI)
        log.info("mongodb connected")
    }
    catch(error){
        log.error(`Could not connect to db > ${error}`)
        process.exit(1)
    }
}

export default connect