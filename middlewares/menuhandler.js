import menu from '../db/menu.js'

import Datastore from 'nedb';
const dbMenu = new Datastore({ filename: './db/menu.db', autoload: true });

// Funktion för att infoga menyer i databasen
export function insertMenu(callback) {
    dbMenu.insert(menu, callback);
}


// Funktion för att uppdatera en menyprodukt
export function updateMenuProduct(productId, updatedFields, callback) {
    updatedFields.modifiedAt = new Date(); // Lägg till modifiedAt med aktuellt datum och tid
    dbMenu.update({ _id: productId }, { $set: updatedFields }, {}, callback);
}

insertMenu((err, newDocs) => {
    if (err) {
        console.log("Fel vid infogning:", err);
    } else {
        console.log("Meny infogad:", newDocs);
    }
});

const updatedFields = {
        "price": 45,
        "id": 1,
        "title": "Bryggkaffe",
        "desc": "Bryggd på månadens bönor.",
};

updateMenuProduct(1, updatedFields, (err, numReplaced) => {
    if (err) {
        console.log("Fel vid uppdatering:", err);
    } else {
        console.log("Antal uppdaterade dokument:", numReplaced);
    }
});