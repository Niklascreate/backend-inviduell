import express from 'express';
import Datastore from 'nedb';

const db = new Datastore({ filename: './db/menu.db', autoload: true });

const router = express.Router();

function requireAdmin(req, res, next) {
    if (req.session && req.session.adminUser) {
        next();
    } else {
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
            res.status(404).json({ error: 'Produkt hittades inte' });
        } else {
            res.status(200).json(product);
        }
    });
});

// Route för att modifiera en produkt
router.put('/modifyproduct/:productId', requireAdmin, (req, res) => {
    const productId = req.params.productId;
    const updatedProduct = req.body;
    updatedProduct.modifiedAt = new Date();

    db.update({ _id: productId }, { $set: updatedProduct }, {}, (err, numUpdated) => {
        if (err) {
            res.status(500).json({ error: 'Database error' });
        } else if (numUpdated === 0) {
            res.status(404).json({ error: 'Produkt hittades inte' });
        } else {
            res.status(200).json({ message: 'Produkten har modifierats' });
        }
    });
});

// Route för att lägga till en ny produkt
router.post('/add', requireAdmin, (req, res) => {
    const { id, title, desc, price } = req.body;

    if (!id || !title || !desc || !price) {
        return res.status(400).json({ error: 'Alla fält (id, title, desc, price) måste fyllas i.' });
    }

    const newProduct = {
        id,
        title,
        desc,
        price,
        about: '',
        createdAt: new Date(),
        _id: new Datastore().createNewId()
    };

    db.insert(newProduct, (err, addedProduct) => {
        if (err) {
            res.status(500).json({ error: 'Database error' });
        } else {
            res.status(201).json({ message: 'Produkt lades till', product: addedProduct });
        }
    });
});

// Route för att ta bort en produkt
router.delete('/delete/:productId', requireAdmin, (req, res) => {
    const productId = req.params.productId;

    db.remove({ _id: productId }, {}, (err, numRemoved) => {
        if (err) {
            res.status(500).json({ error: 'Database error' });
        } else if (numRemoved === 0) {
            res.status(404).json({ error: 'Produkt hittades inte' });
        } else {
            res.status(200).json({ message: 'Produkt raderad' });
        }
    });
});

export default router;
