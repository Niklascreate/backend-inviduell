import express from 'express';
import productsRoutes from './routes/products.js';
import adminRoute from './routes/admin.js';
import db from './db/index.js';

const app = express();
const PORT = 8080;

app.use(express.json());

app.use('/admin', adminRoute); // Skapa admin via POST /admin/create
app.use('/products', productsRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
