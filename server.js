import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./src/config/db.js";
import properties from './src/config/properties.js';
import productRouter from "./src/api/routes/ProductsRoute.js";
import adminRouter from "./src/api/routes/adminsRoute.js";
const port = properties.PORT;
const serverUrl = properties.SERVER_URL;


// connecting to database
connectDB(properties.MONGO_URI);
var allowed_origins = [
    "http://localhost:3001",
    "http://localhost:3002",
    "https://localhost:3001",
    "https://localhost:3002",
    "chrome-extension://pddljdmihkpdfpkgmbhdomeeifpklgnm",
];
// express config
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    cors({
        origin: function (origin, callback) {
            if (allowed_origins.indexOf(origin) !== -1) {
                callback(null, origin);
            } else if (!origin) {
                callback(null, true);
            } else {
                callback(new Error(`${origin}: Not allowed by CORS`));
            }
        },
        credentials: true,
    })
);
try {
    app.use("/static", express.static("static"));
} catch (error) {
    console.log(error);
}

app.use("/api/v1/product", productRouter);
app.use("/admin", adminRouter);


app.get("/", (req, res) => {
    return res.send(`<h1>Running on Port : ${port}</h1>`);
});

app.listen(port, () => {
    console.log(`Open in Browser : ${serverUrl}`);
});