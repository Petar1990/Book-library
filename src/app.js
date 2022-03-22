

import {  logout } from './api/data.js';
import { page, render } from './lib.js';
import { getUserData } from './util.js';
import { addBook } from './views/addBook.js';
import { catalogPage } from './views/dashboard.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { loginPage } from './views/login.js';
import { myBooks} from './views/myBooks.js';
import { registerPage } from './views/register.js';



const root = document.getElementById('site-content');
const logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', onLogout);

page(decoratorContex); // midlewear;
page('/', catalogPage);
page('/login', loginPage);
page('/register', registerPage);
page('/details/:id', detailsPage);
page('/create', addBook);
page('/edit/:id', editPage);
page('/myBooks', myBooks);


function decoratorContex(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateNav = updateNav;
    next();
}

page.start();
updateNav();

async function onLogout() {
    await logout();
    updateNav();
    page.redirect('/')
}

export function updateNav() {
    const userData = getUserData()
    if (userData) {
        document.getElementById('guest').style.display = 'none';
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('user').querySelector('span').textContent = `Welcome, ${userData.email}`
    } else {
        document.getElementById('guest').style.display = 'inline-block';
        document.getElementById('user').style.display = 'none';
    }
}




