import bcrypt from 'bcrypt';
import User from '../models/userModel.js';

export const loginUsers = async (email, password) => {
    try {

        const user = await User.findOne({ where: { email } });
        if (!user) {
            console.log('invalid user:', email)
            return null;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log('invalid Password for:', email)
            return null;
        }

        console.log('user authenticated successfully:', email)
        return user;
    } catch (error) {
        console.log('Error during login process:', error.message)
        throw new Error('Error during login process');
    }
};