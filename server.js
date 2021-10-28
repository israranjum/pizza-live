import express from "express";
import mongoose from "mongoose";
import { APP_PORT, DB_URL } from "./config";
import errorHandler from "./middlewares/errorHandler";
const app = express();
import routes from "./routes";


//Database Connection
mongoose.connect(DB_URL,{useNewUrlParser:true});
const db = mongoose.connection;
db.on('error',console.error.bind(console,'Connection Error:'));
db.once('open',()=>{
    console.log('DB Connected....');
})









app.use(express.json());
app.use('/api', routes);




app.use(errorHandler);
app.listen(APP_PORT,()=>{
    console.log(`Listening on port ${APP_PORT}.`);
})




