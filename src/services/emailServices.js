import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import User from '../models/userModel.js';

export const sendEmailVerification =  async (email,) => {

    try {
        const verificationToken = uuidv4();
        const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

        await User.update( { verificationToken, verificationTokenExpires:expiryDate }, {where: {email: email} } );

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailContents =  {
            from: `"Rent Buddy" ${process.env.EMAIL_USER}`,
            to: email,
            subject: 'Email Verification',
            text: `Please click the link to verify your email address: 
            http://localhost:8070/verify-email/${verificationToken}`,
            html: `<p>Please click the link to verify your email address:</p>
            <a href="http://localhost:8070/verify-email/${verificationToken}">Verify Email</a>`,
        };
    
        await transporter.sendMail(mailContents);
    
        console.log('verification Email Sent!')
        
    } catch (error) {
        console.error('Error sending verification Email:', error);
    };

};

