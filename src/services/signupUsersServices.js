import { v4 as uuidv4 } from 'uuid';
import { sendVerificationEmail } from './emailServices.js';
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';


export const createUsers = async (fullname, email, password, birthday, gender, looking_for, interested_in, interests) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const verificationToken = uuidv4();

        const user = await User.create({
            fullname,
            email,
            password: hashedPassword,
            birthday,
            gender,
            looking_for,
            interested_in,
            interests,
            verificationToken,
        });

        // Send verification email
        await sendVerificationEmail(email, fullname, verificationToken);

        console.log('User created and verification email sent:', user);
        return user;
    } catch (error) {
        console.error('Error during user creation:', error.message);
        throw new Error('Error during user creation');
    }
};

export const getUsers = async () => {
    try {
        const users = await User.findAll();
         
    console.log('users found', users);
    return users
    } catch(error) {
        console.error('Error during users retrieval:', error.message);
        throw new Error('Error during users retrieval');
    };
    
};

export const findUser =  async(fullname) => {
    try{
        const foundUserResult = await User.findOne({where:{fullname: fullname}});
        console.log('user updated', foundUserResult);
        return foundUserResult;
    } catch(error) {
        console.error('Error during user retrieval:', error.message);
        throw new Error('Error during user retrieval');
    };
    
};

export const updateUser = async (fullname, newEmail) => {
    try{
        const updatedUser = await User.update({email: newEmail}, {where:{fullname: fullname}});
        console.log('user updated', updatedUser);
        return updatedUser;
    } catch(error) {
        console.error('Error during user update:', error.message);
        throw new Error('Error during user update');
    };
    
};

export const deleteUser =  async (fullname) => {
    try{
        const deletedUser = await User.destroy({where: { fullname: fullname } });
        console.log('user deleted', deletedUser);
        return deletedUser;
    } catch(error) {
        console.error('Error during user deletion:', error.message);
        throw new Error('Error during user deletion');
    };
    
};