import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

const createAdminUser = (req, res) => {
    const adminUser = {
        userId: uuidv4(),
        username: 'Niklas',
        password: 'Admin123',
        role: 'admin',
        createdAt: new Date()
    };

    db.insert(adminUser, (err, user) => {
        if (err) {
            console.error('Det gick inte att skapa admin-användaren', err);
            res.status(500).json({ error: 'Det gick inte att skapa admin-användaren' });
        } else {
            console.log('Admin-användare skapad', user);
            res.status(201).json({ message: 'Admin-användare skapad', user });
        }
    });
};

router.post('/create', createAdminUser);

export default router;