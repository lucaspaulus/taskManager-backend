import {Response, Request,NextFunction} from "express"
import {AnyZodObject} from "zod"

const schemaValidationMiddleware = (schema: AnyZodObject) => (request: Request, response: Response, next: NextFunction): Response | void => {
    try {
        
        schema.parse({
            body: request.body,
            query: request.query,
            params: request.params
        });
        return next();
    } catch (e: any) {
        return response.status(400).send(e.errors);
    }
};

export default schemaValidationMiddleware
 