import { getMovieById } from "../data.js";

export default async function details() {

    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    };

    const movieId = this.params.id;
    let movie = this.app.userData.movies.find(p => p.objectId == movieId);

    if (movie === undefined) {
        movie = await getMovieById(movieId);
    }

    if(this.app.userData.userId === movie.ownerId){
        movie.canEdit = true;
    }

    if(movie.peopleLiked !== null){
        const peopleWhoLiked = movie.peopleLiked.split(',');
    
        for (const person of peopleWhoLiked) {
            if(this.app.userData.email == person)
            {
                movie.alreadyLikedByUser = true;
            }
        }
    }
    
    const context = Object.assign({ movie }, this.app.userData);

    this.partial('./templates/details.hbs', context);
};
