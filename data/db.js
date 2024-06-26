import Datastore from 'nedb';
import menu from './menu.js';


const dbMenu = new Datastore({ filename: './db/menu.db', autoload: true });
let cachedMenu = null;

function populateMenu() {
    menu.forEach(item => {
        dbMenu.insert(item, (err, newItem) => {
            if (err) {
                console.log('Det gick inte att lägga till objektet i databasen:', err);
            } else {
                console.log('Lagt till i databasen:', newItem);
            }
        });
    });
}

function initializeMenu() {
    // Kontrollera om det finns några poster i databasen
    dbMenu.count({}, (err, count) => {
        if (err) {
            console.log('Det gick inte att kontrollera databasen:', err);
        } else if (count === 0) {
            // Om det inte finns några poster, kör populateMenu
            console.log('Inga poster hittades, lägger till menyobjekten...');
            populateMenu();
        } else {
            console.log('Menyn är redan initierad.');
        }
    });
}

// Kalla på initializeMenu vid programstart
initializeMenu();

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
