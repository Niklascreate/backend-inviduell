import Datastore from 'nedb';

const dbMenu = new Datastore({ filename: './db/menu.db', autoload: true });
let cachedMenu = null;

function getMenu(callback) {
    if (cachedMenu) {
        callback(null, cachedMenu);
    } else {
  
        dbMenu.find({}, (err, menuItems) => {
            if (err) {
                callback(err);
            } else {
                cachedMenu = menuItems;
                callback(null, cachedMenu);
            }
        });
    }
}

export default getMenu;
