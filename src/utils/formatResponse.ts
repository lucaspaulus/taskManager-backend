interface ResponseType{
    statusCode: number,
    success: boolean,
    data?: Object | null
    message: string
}

const formatResponse = (response: ResponseType) => { 
    return response
}

export default formatResponse