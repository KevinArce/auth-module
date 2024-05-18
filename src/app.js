"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("./controllers/authController");
const authMiddleware_1 = require("./middlewares/authMiddleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post('/register', authController_1.register);
app.post('/login', authController_1.login);
app.get('/admin', authMiddleware_1.authenticateJWT, (0, authMiddleware_1.authorizeRoles)('admin'), (req, res) => {
    res.send('Admin content');
});
app.get('/user', authMiddleware_1.authenticateJWT, (0, authMiddleware_1.authorizeRoles)('user', 'admin'), (req, res) => {
    res.send('User content');
});
exports.default = app;
