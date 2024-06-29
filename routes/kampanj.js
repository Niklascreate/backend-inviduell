import express from 'express';
import Datastore from 'nedb';
import kampanjMiddleware from '../middlewares/kampanjMid.js';

const db = new Datastore({ filename: './db/kampanj.db', autoload: true });
const router = express.Router();

// Route för att lägga till kampanjerbjudanden
router.post('/add', kampanjMiddleware, (req, res) => {
    const newCampaign = req.newCampaign; // Hämta kampanjen från request-objektet

    // Skapa kampanjen och spara i databasen
    db.insert(newCampaign, (err, addedCampaign) => {
        if (err) {
            return res.status(500).json({ error: 'Databas error' });
        }

        res.status(201).json({ message: 'Kampanjen laddes till', campaign: addedCampaign });
    });
});

export default router;
