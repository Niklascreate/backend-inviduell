import express from 'express';
import Datastore from 'nedb';

const router = express.Router();
const dbCart = new Datastore({ filename: './db/cart.db', autoload: true });

router.use(errorHandler);

export default router;
