import connectDB from "./config/database";
import app from "./app";

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is Running on PORT : ${PORT}`);
  connectDB();
});
