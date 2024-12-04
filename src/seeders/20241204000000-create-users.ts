import { QueryInterface } from 'sequelize';
const bcrypt = require('bcrypt');

module.exports = {
    up: async (queryInterface: QueryInterface) => {
        await queryInterface.bulkInsert('Users', [
            {
                username: 'Nikhil Admin',
                password: bcrypt.hashSync('adminPassword', 10),
                role: 'admin',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                username: 'Nikhil User',
                password: bcrypt.hashSync('userPassword', 10),
                role: 'user',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    down: async (queryInterface: QueryInterface) => {
        await queryInterface.bulkDelete('Users', {
            username: ['Nikhil Admin', 'Nikhil User']
        }, {});
    }
};
