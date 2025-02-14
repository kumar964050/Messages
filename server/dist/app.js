"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const ErrorHandler_1 = __importDefault(require("./middlewares/ErrorHandler"));
// routes
const auth_route_1 = __importDefault(require("./router/auth.route"));
const user_route_1 = __importDefault(require("./router/user.route"));
const app = (0, express_1.default)();
//middlewares
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
//  routes middleware
app.use("/api/auth", auth_route_1.default);
app.use("/api/user", user_route_1.default);
// NOT FOUND Route
app.all("*", (req, res) => {
    res.status(200).json({ status: "error", message: "NOT FOUND" });
});
// global error handler
app.use(ErrorHandler_1.default);
exports.default = app;
