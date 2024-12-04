import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class GroceryItem extends Model {
    public id!: number;
    public name!: string;
    public price!: number;
    public quantity!: number;
    public category!: string;
}

GroceryItem.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'GroceryItem'
});

export default GroceryItem;