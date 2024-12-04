import sequelize from './config/database';
import express from 'express';
import bodyParser from 'body-parser';
import passport from './config/passport';
import groceryItemRoutes from './routes/groceryItems';
import authRoutes from './routes/auth';
import orderRoutes from './routes/order';
import userRoutes from './routes/userRoutes';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(passport.initialize());

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Grocery API',
            version: '1.0.0',
            description: 'API for managing grocery items'
        }, 
        components: { 
            securitySchemes: { 
                BearerAuth: { 
                    type: 'http', 
                    scheme: 'bearer', 
                    bearerFormat: 'JWT', 
                }, 
            }
        }
    },
    apis: ['./src/routes/*.ts']
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/grocery-items', groceryItemRoutes);
app.use('/api/orders', orderRoutes);

sequelize.sync({ force: false }).then(() => {
    console.log('Database & tables created!');
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
});