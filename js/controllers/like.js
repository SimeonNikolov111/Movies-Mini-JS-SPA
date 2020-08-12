import { likeMovie as likeMovieApi, getMovieById } from '../data.js';

export default async function likeMovie() {

    const movieId = this.params.id;
    const personWhoLiked = this.app.userData.email;

    const movie = getMovieById(movieId);

    if (movie.peopleWhoLiked !== undefined) {
        const peopleWhoLiked = movie.peopleLiked.split(',');

        for (const person of peopleWhoLiked) {
            if (person == personWhoLiked) {
                alert('You cannot like same movie twise');
                return;
            }
        }
    }

    const result = await likeMovieApi(movieId, personWhoLiked);

    this.redirect(`#/home`);
}