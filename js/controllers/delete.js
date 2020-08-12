import {deleteMovie as deleteMovieApi} from '../data.js';

export async function deleteMovie(){

    const movieId = this.params.id;

    try {
        const result = await deleteMovieApi(movieId);

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

        this.redirect('#/home');
    } catch (err) {
        console.error(err);
    }
};