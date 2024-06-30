import { menu } from '../data/menu.js';

const loadMenu = (req, res, next) => {
    req.menu = menu;
    next();
};

export default loadMenu;
