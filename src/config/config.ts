import { configDotenv } from 'dotenv'
configDotenv()

export default {
    BOT_TOKEN: process.env.BOT_TOKEN as string,
    XRapidAPIHost: process.env.XRapidAPIHost as string,
    XRapidAPIKey: process.env.XRapidAPIKey as string,
    NODE_ENV: process.env.NODE_ENV as string,
    PORT: process.env.PORT,
}
