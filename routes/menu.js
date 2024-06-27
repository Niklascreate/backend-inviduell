import getMenu from '../data/dbSetup.js';
import express from 'express';

const router = express.Router();

router.get('/menu', (req, res) => {
    getMenu((err, menuItems) => {
        if (err) {
            res.status(500).json({ error: 'Fel vid hämtning av meny' });
        } else {
            res.json(menuItems);
        }
    });
});

export default router