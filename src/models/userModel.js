import { DataTypes } from 'sequelize';
import sequelize from '../config/mySql.js';

const User = sequelize.define(
    'User',
    {
        fullname: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
        birthday: { type: DataTypes.DATE, allowNull: false },
        gender: { type: DataTypes.STRING, allowNull: false },
        looking_for: { type: DataTypes.STRING, allowNull: false },
        interested_in: { type: DataTypes.STRING, allowNull: false },
        interests: { type: DataTypes.STRING, allowNull: false },
        verificationToken: { type: DataTypes.STRING, allowNull: true },
        isVerified: { type:DataTypes.BOOLEAN, defaultValue: false}
    },
    { timestamps: true }
);

export default User;



