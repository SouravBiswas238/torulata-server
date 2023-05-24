import dotenv from "dotenv";


dotenv.config();

const properties = {
    PORT: process.env.PORT || 5000,

    MONGO_URI: process.env.MONGO_URI || `mongodb+srv://torulota:Jl4N2Nyy2OZzNCPA@cluster0.ds6trld.mongodb.net/test`,
    SERVER_URL: process.env.SERVER_URL || ``

}
export default properties;