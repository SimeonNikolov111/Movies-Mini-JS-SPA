import { getMovies } from "../data.js";

export default async function home(){
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    const search = this.params.search || '';

    const movies = await getMovies(search);
    this.app.userData.movies = movies;
    const context = Object.assign({movies}, this.app.userData);

    this.partial('./templates/home.hbs', context);
}