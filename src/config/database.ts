import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('qp_assessment', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default sequelize;