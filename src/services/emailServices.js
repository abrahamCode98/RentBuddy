import transporter from '../config/emailConfig.js';

export const sendVerificationEmail = async (email, fullname, token) => {
    const verificationLink = `${process.env.BASE_URL}/verify-email?token=${token}`;

    const mailOptions = {
        from: `'RENTBUDDY' ${process.env.EMAIL_USER}`,
        to: email,
        subject: 'Verify Your Account',
        html: `
            <h1>Hello ${fullname},</h1>
            <p>Thank you for signing up. Please verify your account by clicking the link below:</p> <br>
            <a href="${verificationLink}" target="_blank">Verify Account</a> <br>
            <p>If the link doesn't work, copy and paste the following URL into your browser:</p>
            <p><a href="${verificationLink}" target="_blank">${verificationLink}</a></p>
            <p>This link will expire in 1 hour.</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Verification email sent to ${email}`);
    } catch (error) {
        console.error('Error sending email:', error.message);
        throw new Error('Failed to send verification email');
    }
};