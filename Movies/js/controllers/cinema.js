import { getMovies, createMovie, getMovieById, getMovieByOwner, updateMovie, buyTicket as buyTicketApi, deleteMovie as deleteApi } from '../data.js';

export default async function cinema() {

    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    const movies = await getMovies();
    movies.sort((a, b) => b.tickets - a.tickets);
    this.app.userData.movies = movies;
    const context = Object.assign({ origin: encodeURIComponent('#/cinema')}, this.app.userData);

    this.partial('./templates/cinema.hbs', context);
}

export async function create() {

    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    this.partial('./templates/create.hbs');
};

export async function createPost() {
    try {
        if (this.params.title.length < 6) {
            alert('Title shoould be at least 6 characters long!');
            return;
        }
        if (this.params.description.length < 10) {
            alert('Description shoould be at least 10 characters long!');
            return;
        }

        if (this.params.imageUrl.startsWith("http://") == false && this.params.imageUrl.startsWith("https://") == false) {
            alert('The image URL should start with http://');
            return;
        }

        const movie = {
            title: this.params.title,
            image: this.params.imageUrl,
            description: this.params.description,
            genres: this.params.genres,
            tickets: Number(this.params.tickets)
        };

        const result = await createMovie(movie);

        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        document.forms[0].reset();

        this.redirect('#/home');
    }
    catch (err) {
        console.error(err);
    }
};

export async function details() {

    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    const movieId = this.params.id;
    let movie = this.app.userData.movies.find(m => m.objectId == movieId);

    if (movie === undefined) {
        movie = await getMovieById(movieId);
    }

    const context = Object.assign({ movie, origin: encodeURIComponent('#/details/' + movieId) }, this.app.userData);

    this.partial('./templates/details.hbs', context);
};

export async function ownMovies() {

    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    const movies = await getMovieByOwner();
    this.app.userData.movies = movies;
    const context = Object.assign({ ownMovies: true, origin: encodeURIComponent('#/ownmovies') }, this.app.userData);

    this.partial('./templates/ownmovies.hbs', context);
}

export async function edit() {

    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    const movieId = this.params.id;
    let movie = this.app.userData.movies.find(m => m.objectId == movieId);

    if (movie === undefined) {
        movie = await getMovieById(movieId);
    }

    const context = Object.assign({ movie }, this.app.userData);

    this.partial('./templates/edit.hbs', context);
}

export async function editPost() {

    try {
        if (this.params.title.length < 6) {
            alert('Title shoould be at least 6 characters long!');
            return;
        }
        if (this.params.description.length < 10) {
            alert('Description shoould be at least 10 characters long!');
            return;
        }

        if (this.params.imageUrl.startsWith("http://") == false && this.params.imageUrl.startsWith("https://") == false) {
            alert('The image URL should start with http://');
            return;
        }

        const movieId = this.params.id;

        const movie = {
            title: this.params.title,
            image: this.params.imageUrl,
            description: this.params.description,
            genres: this.params.genres,
            tickets: Number(this.params.tickets)
        };

        const result = await updateMovie(movieId, movie);

        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        for (let i = 0; i < this.app.userData.movies.length; i++) {
            if (this.app.userData.movies[i].objectId == movieId) {
                this.app.userData.movies.splice(i, 1);
            }
        }
        
        this.redirect('#/details/' + result.objectId);
    }
    catch (err) {
        console.error(err);
    }
}

export async function buyTicket(){

    const movieId = this.params.id;
    const movie = this.app.userData.movies.find(m => m.objectId == movieId);

    if (movie === undefined) {
        movie = await getMovieById(movieId);
    }
    
    try {
        const result = await buyTicketApi(movie);

        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        this.redirect(this.params.origin);
        
    } catch (err) {
        console.error(err);
        showError(err.message);
    }
}

export async function deleteMovie(){
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    const movieId = this.params.id;
    let movie = this.app.userData.movies.find(m => m.objectId == movieId);

    if (movie === undefined) {
        movie = await getMovieById(movieId);
    }

    const context = Object.assign({ movie }, this.app.userData);

    this.partial('/templates/delete.hbs', context);
}

export async function deleteMoviePost(){

    if (confirm('Are you sure you want to delete this movie?') == false) {
        return this.redirect('#/ownmovies');
    }

    const movieId = this.params.id;

    try {
        const result = deleteApi(movieId);

        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        this.redirect('#/ownmovies');
    } catch (err) {
        console.error(err);
    }
};