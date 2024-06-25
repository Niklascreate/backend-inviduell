// Middleware för att verifiera admin-behörighet
function requireAdmin(req, res, next) {
    // Kontrollera om användaren är inloggad som admin
    if (req.session && req.session.adminUser) {
        next(); // Fortsätt till nästa middleware eller route-handlare
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}
