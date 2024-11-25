import { createUser, checkUser } from '../config/firebaseAuth.js';

export const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await createUser(email, password);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await checkUser(email, password);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}