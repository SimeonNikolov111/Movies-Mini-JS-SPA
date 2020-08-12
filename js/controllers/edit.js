import {editMovie, getMovieById} from '../data.js';

export default async function edit(){
    this.partials ={
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    const movieId = this.params.id;
    let movie = this.app.userData.movies.find(p => p.objectId == movieId);

    if (movie === undefined) {
        movie = await getMovieById(movieId);
    }

    const context = Object.assign({movie} , this.app.userData);

    this.partial('./templates/edit.hbs', context);
}

export async function editPost() {
    try {

        if (this.params.title.length < 1) {
            alert('Title is required!');
            return;
        }
        if (this.params.description.length < 1) {
            alert('Description is required!');
            return;
        }
        if (this.params.imageUrl.length < 1) {
            alert('Image URL is required!');
            return;
        }
        if (!this.params.imageUrl.startsWith('http://') && !this.params.imageUrl.startsWith('https://')) {
            alert('Image should start with http:// or https://.');
            return;
        }

        const movieId = this.params.id;

        const movie = {
            title: this.params.title,
            description: this.params.description,
            imageUrl: this.params.imageUrl
        };

        const result = await editMovie(movieId, movie);

        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        this.redirect('#/home');
    }
    catch (err) {
        console.error(err);
    }
};