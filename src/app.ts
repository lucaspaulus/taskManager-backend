import env from "./config/envs"
import connect from "./utils/connect";
import log from "./utils/logger";
import createServer from "./server";
const app = createServer()

app.listen(env.port, async ()=> {
    log.info(`Server started at port: ${env.port}`)
    await connect()

})

