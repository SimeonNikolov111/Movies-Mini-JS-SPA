import home from './controllers/home.js';
import login, {loginPost} from './controllers/login.js';
import register, {registerPost} from './controllers/register.js';
import logout from './controllers/logout.js';
import create, {createPost} from './controllers/create.js';
import details from './controllers/details.js';
import edit, {editPost} from './controllers/edit.js';
import {deleteMovie} from './controllers/delete.js';
import likeMovie from './controllers/like.js';

window.addEventListener('load', () => {
    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        this.userData = {
            email: sessionStorage.getItem('email') || '',
            userId: sessionStorage.getItem('userId') || '',
            movies: []
        };

        this.get('/', home);
        this.get('index.html', home);
        this.get('#/home', home);

        this.get('#/register', register);
        this.post('#/register', ctx => { registerPost.call(ctx); });

        this.get('#/login', login)
        this.post('#/login', ctx => { loginPost.call(ctx); });

        this.get('#/logout', logout);

        this.get('#/create', create);
        this.post('#/create',  ctx => { createPost.call(ctx); });

        this.get('#/details/:id', details)

        this.get('#/edit/:id', edit);
        this.post('#/edit/:id', ctx => { editPost.call(ctx); });

        this.get('#/like/:id', likeMovie);
        this.get('#/delete/:id', deleteMovie);
    });

    app.run();
});