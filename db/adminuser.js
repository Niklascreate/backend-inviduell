import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import Datastore from 'nedb';

const router = express.Router();
const db = new Datastore({ filename: './db/admin.db', autoload: true });

// Hårdkodad admin-användare
const adminUser = {
    userId: uuidv4(),
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    createdAt: new Date()
};

// Funktion för att verifiera admin-användare
export const verifyAdmin = (username, password) => {
    return new Promise((resolve, reject) => {
        if (username === adminUser.username && password === adminUser.password) {
            resolve(adminUser);
        } else {
            reject(new Error('Fel inloggningsuppgifter. Försök igen!'));
        }
    });
};

export default router;
