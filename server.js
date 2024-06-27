import express from 'express';
import session from 'express-session';
import productsRoutes from './routes/products.js';
import adminRoute from './routes/admin.js';
import modifyRoute from './routes/modifyproduct.js';
import menuRoute from './routes/menu.js';

const app = express();
const PORT = 8080;

// Konfigurera sessionsmiddleware
app.use(session({
  secret: 'hemlig nyckel',  // En hemlig nyckel för att signera session-cookie
  resave: false,            // Förhindrar att sessionen sparas om om den inte ändrats
  saveUninitialized: false, // Förhindrar att tomma sessioner lagras
  cookie: { secure: false }  // Används för HTTPS. Sätt till false om du bara testar lokalt utan HTTPS
}));

app.use(express.json());

app.use('/admin', adminRoute); // Skapa admin via POST /admin/verify
app.use('/products', productsRoutes); // Hämta produkterna
app.use('/modify', modifyRoute); // Modifiera produkt
app.use('/menu', menuRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});