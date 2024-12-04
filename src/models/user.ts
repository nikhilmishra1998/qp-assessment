import { Model, DataTypes } from 'sequelize';
import crypto from 'crypto';
import sequelize from '../config/database';

class User extends Model {
    public id!: number;
    public username!: string;
    public password!: string;
    public role!: string;

    public validPassword(password: string): boolean {
        const hash = crypto.createHash('sha256').update(password).digest('hex');
        return this.password === hash;
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user', // Default role is user
    }
}, {
    sequelize,
    modelName: 'User',
    hooks: {
        beforeCreate: (user: User) => {
            const hash = crypto.createHash('sha256').update(user.password).digest('hex');
            user.password = hash;
        },
    },
});

export default User;
