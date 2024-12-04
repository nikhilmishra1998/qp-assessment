import { Router } from 'express';
import { addGroceryItem, getGroceryItems, removeGroceryItem, updateGroceryItem, updateInventory } from '../controllers/groceryItemController';
import passport from 'passport';
import { isAdmin } from '../middleware/auth';

const router = Router();

/**
 * @swagger
 * /api/grocery-items:
 *   post:
 *     summary: Add a new grocery item
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: float
 *               quantity:
 *                 type: integer
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Grocery item created successfully
 */
router.post('/', passport.authenticate('jwt', { session: false }), isAdmin, addGroceryItem);

/**
 * @swagger
 * /api/grocery-items:
 *   get:
 *     summary: View existing grocery items
 *     responses:
 *       200:
 *         description: A list of grocery items
 */
router.get('/', getGroceryItems);

/**
 * @swagger
 * /api/grocery-items/{id}:
 *   delete:
 *     summary: Remove a grocery item
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the grocery item
 *     responses:
 *       204:
 *         description: Grocery item removed successfully
 */
router.delete('/:id', passport.authenticate('jwt', { session: false }), isAdmin, removeGroceryItem);

/**
 * @swagger
 * /api/grocery-items/{id}:
 *   put:
 *     summary: Update a grocery item
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the grocery item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: float
 *               quantity:
 *                 type: integer
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Grocery item updated successfully
 */
router.put('/:id', passport.authenticate('jwt', { session: false }), isAdmin, updateGroceryItem);

/**
 * @swagger
 * /api/grocery-items/{id}/inventory:
 *   patch:
 *     summary: Update the inventory level of a grocery item
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the grocery item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Inventory level updated successfully
 */
router.patch('/:id/inventory', passport.authenticate('jwt', { session: false }), isAdmin, updateInventory);

export default router;
