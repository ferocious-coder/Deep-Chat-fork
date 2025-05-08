import app from "./app.js";
import { connectDB } from "./db/connections.js";

const PORT = process.env.PORT || 5000;
connectDB().then(() => {

  app.listen(PORT,()=> console.log("Server Started and Connected to Database"));

}).catch((err) => console.log(err));

