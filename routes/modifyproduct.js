import express from 'express';
import Datastore from 'nedb';

const db = new Datastore({ filename: './db/menu.db', autoload: true });


const router = express.Router();

// Middleware för att verifiera admin
function requireAdmin(req, res, next) {
    // Exempel: Kontrollera om användaren är inloggad och är admin
    if (req.session && req.session.adminUser) {
        // Om användaren är admin, fortsätt med nästa middleware eller route-handler
        next();
    } else {
        // Om användaren inte är admin, skicka tillbaka en 401 Unauthorized status
        res.status(401).json({ error: 'Logga in som ADMIN för att kunna hämta data.' });
    }
}

// Route för att hämta en specifik produkt för redigering
router.get('/:productId', requireAdmin, (req, res) => {
    const productId = req.params.productId;

    db.findOne({ _id: productId }, (err, product) => {
        if (err) {
            res.status(500).json({ error: 'Database error' });
        } else if (!product) {
            res.status(404).json({ error: 'Product not found' });
        } else {
            res.status(200).json(product);
        }
    });
});

// Route för att spara ändringar i en produkt
router.put('/:productId', requireAdmin, (req, res) => {
    const productId = req.params.productId;
    const updatedProduct = req.body;

    db.update({ _id: productId }, { $set: updatedProduct }, {}, (err, numUpdated) => {
        if (err) {
            res.status(500).json({ error: 'Database error' });
        } else if (numUpdated === 0) {
            res.status(404).json({ error: 'Product not found' });
        } else {
            res.status(200).json({ message: 'Product updated successfully' });
        }
    });
});

export default router;