import 'dotenv/config'
const {DB_USER, DB_PASSWORD, DB_PORT, DB_HOST, DB_NAME} = process.env
const envs = {
    port: process.env.APP_PORT as string,
    dbURI: `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin` as string,
    bcryptSalt: Number(process.env.BCRYPT_SALT) as number,
    jwtExpirationTime: process.env.JWT_EXPIRATION_TIME as string,
    jwtSecretKey: process.env.JWT_SECRET_KEY as string
}

export default envs