import { Request, Response } from 'express';
import Order from '../models/order';
import OrderItem from '../models/orderItem';
import GroceryItem from '../models/groceryItem';

export const createOrder = async (req: Request, res: Response): Promise<Response> => {
    const { items } = req.body;
    try {
        const order = await Order.create({});
        const orderItems = await Promise.all(
            items.map(async (item: { groceryItemId: number, quantity: number }) => {
                try {
                    const groceryItem = await GroceryItem.findByPk(item.groceryItemId);
                    if (!groceryItem) {
                        throw new Error(`Grocery item with id ${item.groceryItemId} not found`);
                    }

                    // Deduct the ordered quantity from the available quantity
                    if (groceryItem.quantity < item.quantity) {
                        throw new Error(`Insufficient quantity for grocery item id ${item.groceryItemId}`);
                    }
                    groceryItem.quantity -= item.quantity;
                    await groceryItem.save();

                    return OrderItem.create({
                        orderId: order.id,
                        groceryItemId: item.groceryItemId,
                        quantity: item.quantity,
                        price: groceryItem.price
                    });
                } catch (error) {
                    console.error(`Error creating order item for groceryItemId ${item.groceryItemId}:`, error);
                    return null;
                }
            })
        );
        return res.status(201).json({ order, orderItems });
    } catch (error) {
        return res.status(500).json({ message: 'Error creating order', error });
    }
};
