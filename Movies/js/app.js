/* globals Sammy */
import home from './controllers/home.js';
import register, {registerPost} from './controllers/register.js';
import login, {loginPost} from './controllers/login.js';
import logout from './controllers/logout.js';
import cinema, {create, createPost, details, ownMovies, edit, editPost, buyTicket, deleteMovie, deleteMoviePost} from './controllers/cinema.js';

window.addEventListener('load', () => {
    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        this.userData = {
            username: localStorage.getItem('username') || '',
            userId: localStorage.getItem('userId') || '',
            movies: []
        };

        this.get('/', home);
        this.get('index.html', home);
        this.get('#/home', home);

        this.get('#/register', register);
        this.post('#/register', ctx => { registerPost.call(ctx); });

        this.get('#/login', login)
        this.post('#/login', ctx => { loginPost.call(ctx); });

        this.get('#/logout', logout)

        //cinema controller
        this.get('#/cinema', cinema);

        this.get('#/create', create);
        this.post('#/create',  ctx => { createPost.call(ctx); });

        this.get('#/details/:id', details)
        this.get('#/ownmovies', ownMovies)

        this.get('#/edit/:id', edit);
        this.post('#/edit/:id', ctx => { editPost.call(ctx); });

        this.get('#/buy/:id', buyTicket);

        this.get('#/delete/:id', deleteMovie);
        this.post('#/delete/:id', ctx => { deleteMoviePost.call(ctx); });
    });

    app.run();
});