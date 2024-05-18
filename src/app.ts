import express from 'express';
import { register, login } from './controllers/authController';
import { authenticateJWT, authorizeRoles } from './middlewares/authMiddleware';

const app = express();
app.use(express.json());

app.post('/register', register);
app.post('/login', login);

app.get('/admin', authenticateJWT, authorizeRoles('admin'), (req, res) => {
    res.send('Admin content');
});

app.get('/user', authenticateJWT, authorizeRoles('user', 'admin'), (req, res) => {
    res.send('User content');
});

export default app;
