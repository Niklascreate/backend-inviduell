import Datastore from 'nedb';

const dbMenu = new Datastore({ filename: './db/menu.db', autoload: true });

export default dbMenu;
