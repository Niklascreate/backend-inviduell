import express from 'express';
import Datastore from 'nedb';
import kampanjMiddleware from '../middlewares/kampanjMid.js';

const db = new Datastore({ filename: './db/kampanj.db', autoload: true });

const router = express.Router();

// Route för att lägga till kampanjerbjudanden
router.post('/add', kampanjMiddleware, (req, res) => {
    const { title, description, products } = req.body;

    // Kontrollera att obligatoriska fält finns
    if (!title || !description || !products) {
        return res.status(400).json({ error: 'Alla fält är obligatoriska' });
    }

    // Skapa kampanjen och spara i databasen
    const newCampaign = {
        id,
        title,
        description,
        products,
        createdAt: new Date()
    };

    db.insert(newCampaign, (err, addedCampaign) => {
        if (err) {
            return res.status(500).json({ error: 'Databas error' });
        }

        res.status(201).json({ message: 'Kampanjen laddes till', campaign: addedCampaign });
    });
});

export default router;