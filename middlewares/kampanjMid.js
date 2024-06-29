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

    // Alla produkter finns i menyn, fortsätt till nästa middleware eller route-handler
    next();
}
