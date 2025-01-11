import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import signupRoutes from './src/routes/signupRoutes.js';
import loginRoute from './src/routes/loginRoute.js';
import profileRoute from './src/routes/profileRoute.js';
import { connectMySQL } from './src/config/mySql.js'

dotenv.config();
const app = express();

const startServer = async () => {
    try{
        await connectMySQL();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);


app.use("/api", signupRoutes);
app.use("/api", loginRoute);
app.use("/api", profileRoute);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    } catch(error) {
        console.error('Failed to start server:', error.message);
        process.exit(1);
    };
};
    
startServer(); 