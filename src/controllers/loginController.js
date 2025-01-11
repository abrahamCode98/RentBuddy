import { loginUsers } from '../services/loginUsersServices.js';
import jwt from 'jsonwebtoken';


export const login = async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await loginUsers(email, password);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        };

        const payload = { email: user.email };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_SECRET_EXPIRATION });

        res.status(200).json({ message: 'User logged in', token });
        console.log(token);
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
};

