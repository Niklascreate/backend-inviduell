import express from 'express';
import productsRoutes from './routes/products.js';
import adminRoute from './routes/admin.js';
import modifyRoute from './routes/modifyproduct.js';

const app = express();
const PORT = 8080;

app.use(express.json());

app.use('/admin', adminRoute); // Skapa admin via POST /admin/verify
app.use('/products', productsRoutes); // Hämta produkterna
app.use('/modify', modifyRoute); // Modifiera produkt


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
