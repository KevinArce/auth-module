import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secret = 'a_super_secure_and_not_public_on_github_secret';

export const generateToken = (user: { id: string, roles: string[] }) => {
    return jwt.sign(user, secret, { expiresIn: '1h' });
};

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
        jwt.verify(token, secret, (err: any, user: any) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

export const authorizeRoles = (...allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRoles = req.user?.roles || [];
        if (allowedRoles.some(role => userRoles.includes(role))) {
            next();
        } else {
            res.sendStatus(403);
        }
    };
};
