import { Request, Response } from 'express';
import GroceryItem from '../models/groceryItem';

export const addGroceryItem = async (req: Request, res: Response): Promise<void> => {
    try {
        const item = await GroceryItem.create(req.body);
        res.status(201).json(item);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ message: errorMessage });
    }
};

export const getGroceryItems = async (req: Request, res: Response): Promise<void> => {
    try {
        const items = await GroceryItem.findAll();
        res.json(items);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ message: errorMessage });
    }
};

export const removeGroceryItem = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        await GroceryItem.destroy({ where: { id } });
        res.status(204).json({ message: 'Grocery item removed successfully' });
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ message: errorMessage });
    }
};

export const updateGroceryItem = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        await GroceryItem.update(req.body, { where: { id } });
        res.status(200).json({ message: 'Grocery item updated successfully' });
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ message: errorMessage });
    }
};

export const updateInventory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        await GroceryItem.update({ quantity }, { where: { id } });
        res.status(200).json({ message: 'Inventory level updated successfully' });
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ message: errorMessage });
    }
};
