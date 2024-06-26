import express from 'express';
import { verifyAdmin } from '../data/adminuser.js';

const router = express.Router();

// Route för att verifiera admin-användare
router.post('/loggin', async (req, res) => {
    const { username, password } = req.body;

    try {
        const adminUser = await verifyAdmin(username, password);
        // Spara admin info i sessionen
        req.session.adminUser = { id: adminUser.userId, username: adminUser.username };
        res.status(200).json({ message: 'Admin inloggad', user: adminUser });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

export default router;
