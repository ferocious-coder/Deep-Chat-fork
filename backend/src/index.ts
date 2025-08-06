import app from "./app.js";
import { connectDB } from "./db/connections.js";

const port = process.env.PORT;
connectDB().then(() => {

  app.listen(port,()=> console.log("Server Started and Connected to Database"));

}).catch((err) => console.log(err));
