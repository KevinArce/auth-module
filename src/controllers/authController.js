"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const userService_1 = require("../services/userService");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, roles } = req.body;
    const user = yield (0, userService_1.registerUser)(username, password, roles);
    res.json(user);
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield (0, userService_1.authenticateUser)(username, password);
    if (user) {
        const token = (0, authMiddleware_1.generateToken)({ id: user.id, roles: user.roles });
        res.json({ token });
    }
    else {
        res.sendStatus(401);
    }
});
exports.login = login;
