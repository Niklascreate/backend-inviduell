import express from 'express';
import Datastore from 'nedb';
import kampanjMiddleware from '../middlewares/kampanjMid.js';

const db = new Datastore({ filename: './db/kampanj.db', autoload: true });

const router = express.Router();

// Route för att lägga till kampanjerbjudanden
router.post('/addkampanj', kampanjMiddleware, (req, res) => {
    const { title, description, products } = req.body;

    // Skapa kampanjen och spara i databasen
    const newCampaign = {
        title,
        description,
        products,
        createdAt: new Date(),
        _id: new Datastore().createNewId()
    };

    db.insert(newCampaign, (err, addedCampaign) => {
        if (err) {
            return res.status(500).json({ error: 'Databas error' });
        }

        res.status(201).json({ message: 'Kampanjen laddes till', campaign: addedCampaign });
    });
});

export default router;
