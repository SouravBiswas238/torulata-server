import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import properties from './config/properties.js';
import productRouter from "./api/routes/ProductsRoute.js";
import adminRouter from "./api/routes/adminsRoute.js";
import odderRouter from "./api/routes/odderRoute.js";
import bannerRouter from "./api/routes/bannerRoute.js";
import userRouter from "./api/routes/userRoute.js";
const port = properties.PORT;

// connecting to database
connectDB(properties.MONGO_URI);
var allowed_origins = [
    "http://localhost:3001",

    "http://localhost:3000",
    "http://localhost:3002",
    "https://localhost:3001",
    "https://localhost:3002",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    process.env.NEW_ALLOWED_ORIGINS,

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
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/odder", odderRouter)
app.use("/banner", bannerRouter)


app.get("/", (req, res) => {
    return res.send(`<h1>Running on Port : ${port}</h1>`);
});

app.listen(port, () => {
    console.log(`Open in Browser : ${port}`);
});