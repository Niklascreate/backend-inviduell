import express from 'express';
import session from 'express-session';
import productsRoutes from './routes/products.js';
import adminRoute from './routes/admin.js';
import modifyRoute from './routes/modifyproduct.js';
import menuRoute from './routes/menu.js';
import kampanjRoute from './routes/Kampanj.js';

const app = express();
const PORT = 8080;

// Konfigurera sessionsmiddleware
app.use(session({
  secret: 'hemlig nyckel',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use(express.json());

app.use('/admin', adminRoute); // Logga in med admin
app.use('/products', productsRoutes); // Hämta produkterna
app.use('/modify', modifyRoute); // Lägga till, ta bort, modifiera produkt.
app.use('/menu', menuRoute); //Hämta menyn från databasen
app.use('/kampanj', kampanjRoute); //Lägg till kampanj

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});