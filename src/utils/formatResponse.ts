interface jsonDataType{
    statusCode: number,
    success: boolean,
    data?: Object | null
    message: string
}

const formatResponse = (jsonData: jsonDataType) => { 
    return jsonData
}

export default formatResponse