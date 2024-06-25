import express from 'express';
import Datastore from 'nedb';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
const db = new Datastore({ filename: './db/products.db', autoload: true });

// Middleware för att verifiera admin
function requireAdmin(req, res, next) {
    // Implementera din logik för att verifiera admin här
    // Exempelvis kan du kontrollera om användaren är inloggad som admin
    // och sedan anropa next() om de är admin, annars returnera en 401 Unauthorized
    // I detta exemplet låtsas vi att det redan finns en funktion för detta.
    next(); // Glöm inte att anropa next() när du är klar med verifieringen
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
