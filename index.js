import app from "./app.js";
import { config } from "dotenv";
import path from "path";
import {v2 as cloudinary} from 'cloudinary';
import connectDataBase from "./database/dataBase.js";
const root = path.resolve();

config({ path: root + "/config/.env" });
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key:process.env.CLOUD_API_KEY, 
  api_secret:process.env.CLOUD_API_SECRET
});

connectDataBase();
app.listen(process.env.PORT, () => {
  console.log(`server started at localhost:${process.env.PORT}`);
});

Error.captureStackTrace(err=>{
    console.log("something went ")
})
