import { menu } from '../data/menu.js';

export default function kampanjMid(req, res, next) {
    const products = req.body.products;

    if (!products) {
        return res.status(400).json({ error: 'Products field is required' });
    }

    if (!Array.isArray(products)) {
        return res.status(400).json({ error: 'Products must be an array' });
    }

    const productIds = products.map(product => product.id);

    // Kontrollera om alla produkter har ett ID
    const invalidProducts = productIds.filter(productId => !productId);

    if (invalidProducts.length > 0) {
        return res.status(400).json({ error: 'All products must have an id' });
    }

    // Kontrollera att alla produkter i kampanjen finns i menyn
    const notFoundProducts = productIds.filter(productId => !menu.some(item => item.id === productId));

    if (notFoundProducts.length > 0) {
        return res.status(404).json({ error: `Products not found in menu: ${notFoundProducts.join(', ')}` });
    }

    // Kopiera produkter från menu.js till kampanjen
    const selectedProducts = menu.filter(item => productIds.includes(item.id));

    // Kontrollera att endast två produkter är valda
    if (selectedProducts.length !== 2) {
        return res.status(400).json({ error: 'Exactly two products must be selected for the campaign' });
    }

    const totalPrice = selectedProducts.reduce((acc, curr) => acc + curr.price, 0);

    // Skapa kampanjen och spara i databasen
    const newCampaign = {
        title: req.body.title,
        description: req.body.description,
        products: selectedProducts,
        createdAt: new Date(),
        Kampanjpris: totalPrice
    };

    req.newCampaign = newCampaign; // Lägg till kampanjen i request-objektet för användning i nästa middleware eller route-handler
    next();
}