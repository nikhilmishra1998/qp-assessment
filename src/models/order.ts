import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Order extends Model {
    public id!: number;
    public createdAt!: Date;
    public updatedAt!: Date;
}

Order.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
}, {
    sequelize,
    modelName: 'Order',
    timestamps: true,
});

export default Order;
