import mongoose from "mongoose";

// connect with database
// Jl4N2Nyy2OZzNCPA
// torulota
const connectDB = async (mongoUri) => {
    mongoose
        .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Connected to Database!");
        })
        .then((err) => {
            if (err) {
                console.log(err);
            }
        });
};

export default connectDB;