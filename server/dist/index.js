"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("./config/database"));
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 5001;
app_1.default.listen(PORT, () => {
    console.log(`Server is Running on PORT : ${PORT}`);
    (0, database_1.default)();
});
