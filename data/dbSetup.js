// dbSetup.js
import Datastore from 'nedb';
import { menu } from './menu.js';

const dbMenu = new Datastore({ filename: './db/menu.db', autoload: true });

// Funktion för att initialisera databasen med menydata
const initializeDatabase = () => {
    dbMenu.find({}, (err, docs) => {
        if (err) {
            console.log('Fel vid hämtning av data från databasen:', err);
            return;
        }

        if (docs.length === 0) {
            dbMenu.insert(menu, (err, newDocs) => {
                if (err) {
                    console.log('Fel vid initiering av databasen:', err);
                } else {
                    console.log('Databasen har initialiserats med menydata:', newDocs);
                }
            });
        } else {
            console.log('Databasen innehåller redan data.');
        }
    });
};

initializeDatabase();

export default dbMenu;