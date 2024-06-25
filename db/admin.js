import Datastore from 'nedb';

const db = new Datastore({ filename: './db/admin.db', autoload: true });

export default db;