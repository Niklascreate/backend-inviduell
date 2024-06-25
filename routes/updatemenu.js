import express from 'express';

const router = express.Router();

// Route för att infoga meny
router.post('/insertMenu', (req, res) => {
    insertMenu((err, newDocs) => {
        if (err) {
            res.status(500).send("Fel vid infogning: " + err);
        } else {
            res.status(200).send("Meny infogad: " + JSON.stringify(newDocs));
        }
    });
});

// Route för att uppdatera en menyprodukt
router.put('/updateMenuProduct/:id', (req, res) => {
    const productId = req.params.id;
    const updatedFields = req.body;

    updateMenuProduct(productId, updatedFields, (err, numReplaced) => {
        if (err) {
            res.status(500).send("Fel vid uppdatering: " + err);
        } else {
            res.status(200).send("Antal uppdaterade dokument: " + numReplaced);
        }
    });
});

export default router;