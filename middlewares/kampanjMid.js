import { menu } from './data/menu.js';

export default function kampanjMid(req, res, next) {
    const products = req.body.products;

    if (!Array.isArray(products)) {
        return res.status(400).json({ error: 'Products must be an array' });
    }

    const productIds = products.map(product => product.id);

    // Kontrollera att alla produkter i kampanjen finns i menyn
    const invalidProducts = productIds.filter(productId => !menu.some(item => item.id === productId));

    if (invalidProducts.length > 0) {
        return res.status(404).json({ error: `Products not found in menu: ${invalidProducts.join(', ')}` });
    }

    // Alla produkter finns i menyn, fortsätt till nästa middleware eller route-handler
    next();
}
