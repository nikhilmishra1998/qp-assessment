import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Order from './order';
import GroceryItem from './groceryItem';

class OrderItem extends Model {
    public id!: number;
    public orderId!: number;
    public groceryItemId!: number;
    public quantity!: number;
    public price!: number;
}

OrderItem.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Order,
            key: 'id',
        }
    },
    groceryItemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: GroceryItem,
            key: 'id',
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'OrderItem',
});

Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
GroceryItem.hasMany(OrderItem, { foreignKey: 'groceryItemId' });
OrderItem.belongsTo(GroceryItem, { foreignKey: 'groceryItemId' });

export default OrderItem;
