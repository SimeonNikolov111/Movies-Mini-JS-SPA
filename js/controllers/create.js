import {createMovie} from '../data.js';

export default async function create(){
    this.partials ={
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    };

    this.partial('./templates/create.hbs', this.app.userData);
}

export async function createPost() {
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

        const movie = {
            title: this.params.title,
            description: this.params.description,
            imageUrl: this.params.imageUrl,
            creator: this.app.userData.email,
            likesCounter: 0,
            peopleLiked: ''
        };

        const result = await createMovie(movie);

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