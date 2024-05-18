"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = exports.authenticateJWT = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = 'your_jwt_secret';
const generateToken = (user) => {
    return jsonwebtoken_1.default.sign(user, secret, { expiresIn: '1h' });
};
exports.generateToken = generateToken;
const authenticateJWT = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (token) {
        jsonwebtoken_1.default.verify(token, secret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    }
    else {
        res.sendStatus(401);
    }
};
exports.authenticateJWT = authenticateJWT;
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        const userRoles = req.user.roles;
        if (allowedRoles.some(role => userRoles.includes(role))) {
            next();
        }
        else {
            res.sendStatus(403);
        }
    };
};
exports.authorizeRoles = authorizeRoles;
