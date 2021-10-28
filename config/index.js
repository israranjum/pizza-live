import dontenv from 'dotenv'
dontenv.config();

export const {
    APP_PORT,
    DEBUG_MODE,
    DB_URL,
    JWT_SECRET
} = process.env;