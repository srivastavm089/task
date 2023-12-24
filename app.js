import express from "express";
import cors from "cors";
import userRoute from "./routes/userRoute.js"
const app = express();
app.use(cors());
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({ limit: "500mb", extended: true }));

app.use("/task/v1",userRoute)

export default app;
