import express from 'express';
import { verifyAdmin } from '../db/adminuser.js';

const router = express.Router();

// Route för att verifiera admin-användare
router.post('/verify', async (req, res) => {
    const { username, password } = req.body;

    try {
        const adminUser = await verifyAdmin(username, password);
        res.status(200).json({ message: 'Admin inloggad', user: adminUser });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

export default router;
