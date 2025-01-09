"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userService_1 = require("./services/userService");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.get("/", function (req, res) {
    res.send("Hello World!");
});
app.get("/users/:id", async (req, res) => {
    console.log("getUserBefore", req.params.id);
    const user = await (0, userService_1.getUser)(req.params.id);
    console.log("getUserAfter", user);
    res.send(user);
});
app.listen(9000, function () {
    console.log("Example app listening on port 9000!");
});
