import { body, validationResult } from 'express-validator';
import User from '../models/userModel.js';

const validateIfEmailExist = async (value) => {
    const existingEmail = await User.findOne({where: {email: value}});

    if (existingEmail) {

        throw new Error('Email already exist');
         
    } else {
        return true
    };
};

const confirmPassword = (value, {req}) => {
    const confirmedPassword = req.body.password;
    if (value == confirmedPassword ) {
        return true;
        
    } else {
        console.error(`password mismatch: password=${confirmedPassword}, confirmedPassword=${confirmedPassword}`);
        throw new Error('Password does not match');
    };
};

export const formValidator = [
    body('fullname').isString().notEmpty().withMessage('Please provide your full name'),
    body('email').isEmail().notEmpty().withMessage('Please provide a valid email address').custom(validateIfEmailExist).normalizeEmail(),
    body('password').notEmpty().withMessage('password is required').isAlphanumeric().withMessage('Password must contain at least one number').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'), 
    body('confirmPassword').notEmpty().withMessage('Confirm password required').custom(confirmPassword),

    (req, res, next,) => {

        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        console.log('Data Valid');
        next();
}
];