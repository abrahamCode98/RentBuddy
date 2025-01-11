import { sendEmailVerification } from '../services/emailServices.js';
import {
    createUsers,
    getUsers,
    updateUser,
    findUser,
    deleteUser,
} from '../services/signupUsersServices.js';



export const createNewUsers =  async (req, res) => {
    const { fullname, email, password, birthday, gender, looking_for, interested_in, interests } = req.body
    console.log('Incoming request:', req.body);
    try {
        const user = await createUsers(fullname, email, password, birthday, gender, looking_for, interested_in, interests);

        await  sendEmailVerification(email, user.verificationToken);

        res.status(201).json({message: 'User created, Verification email sent'});
        
    } catch(error) {
        console.error('Error during user creation', error);

        if (error.name === 'SequelizeUniqueConstraintError') {
            res.send('User with this email already exists');
        } else {
            res.status(500).json({ error: error.message });
        }
    };
};


 export const getUserData = async (req, res) => {
    console.log(req.query);
    try {
        const users =  await getUsers();
        res.status(200).json({users});
    } catch(error) {
        res.status(500).json({error: error.message});
    };
};


 export const updateUserData = async ( req, res) => {
    const { fullname } = req.params;
    const { email } = req.body;
    try {
        await updateUser(fullname, email);
        res.status(200).json({message: 'User updated'});
    } catch (error) {
        res.status(400).json({error:error.message});
    };
};

export const findUserData = async ( req, res) => {
    console.log(req.params)
    const { fullname } = req.params;
    try {
        const foundUser = await findUser(fullname);
        if(foundUser) {
            res.status(200).json({foundUser});
        } else {
            res.status(404).json({error: 'User not found'});
        };   
    }catch (error) {
        res.status(500).json({error: error.message});
    };
};

export const deleteUserData = async (req, res) => {
    const { fullname } = req.params;
    try {
        const deletedUserResult = await deleteUser(fullname);
        if (deletedUserResult) {
            res.status(200).json({message: 'user deleted successfully'});
        } else {
            res.status(404).json({message: 'user not found'});
        }
    } catch(error) {
        res.status(500).json({error: error.message});
    };
};