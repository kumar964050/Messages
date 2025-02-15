import express from "express";
import morgan from "morgan";
import ErrorHandler from "./middlewares/ErrorHandler";
// routes
import authRoute from "./router/auth.route";
import userRoute from "./router/user.route";
import msgRoute from "./router/msg.route";

const app = express();
//middlewares
app.use(express.json());
app.use(morgan("dev"));
//  routes middleware
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/msg", msgRoute);

// NOT FOUND Route
app.all("*", (req, res) => {
  res.status(200).json({ status: "error", message: "NOT FOUND" });
});

// global error handler
app.use(ErrorHandler);

export default app;
