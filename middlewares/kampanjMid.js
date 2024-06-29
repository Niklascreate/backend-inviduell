import { menu } from '../data/menu.js';

export default function kampanjMid(req, res, next) {
    const products = req.body.products;

    if (!products) {
        return res.status(400).json({ error: 'Produkter är ett obligatoriskt fält' });
    }

    if (!Array.isArray(products)) {
        return res.status(400).json({ error: 'Produkterna måste vara en array' });
    }

    const productIds = products.map(product => product.id);

    // Kontrollera om alla produkter har ett ID
    const invalidProducts = productIds.filter(productId => !productId);

    if (invalidProducts.length > 0) {
        return res.status(400).json({ error: 'Alla produkter måste ha ett id' });
    }

    // Kontrollera att alla produkter i kampanjen finns i menyn
    const notFoundProducts = productIds.filter(productId => !menu.some(item => item.id === productId));

    if (notFoundProducts.length > 0) {
        return res.status(404).json({ error: `Produkten/produkterna kunde ej hittas: ${notFoundProducts.join(', ')}` });
    }

    const selectedProducts = menu.filter(item => productIds.includes(item.id));

    // Kontrollera att endast två produkter är valda
    if (selectedProducts.length !== 2) {
        return res.status(400).json({ error: 'Endast två produkter får ingå i kampanjen' });
    }

    const totalPrice = selectedProducts.reduce((acc, curr) => acc + curr.price, 0);

    // Skapa kampanjen
    const newCampaign = {
        title: req.body.title,
        description: req.body.description,
        products: selectedProducts,
        createdAt: new Date(),
        Kampanjpris: totalPrice
    };

    req.newCampaign = newCampaign;
    next();
}