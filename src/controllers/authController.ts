import { Request, Response } from 'express';
import { registerUser, authenticateUser } from '../services/userService';
import { generateToken } from '../middlewares/authMiddleware';

export const register = async (req: Request, res: Response) => {
    const { username, password, roles } = req.body;
    const user = await registerUser(username, password, roles);
    res.json(user);
};

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await authenticateUser(username, password);
    if (user) {
        const token = generateToken({ id: user.id, roles: user.roles });
        res.json({ token });
    } else {
        res.sendStatus(401);
    }
};
