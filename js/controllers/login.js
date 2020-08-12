import { login as loginApi } from '../data.js';

export default async function login() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    this.partial('./templates/login.hbs');
}

export async function loginPost() {
    try {

        const email = this.params.email;
        const password = this.params.password;

        const result = await loginApi(email, password);

        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        this.app.userData.email = result.email;
        this.app.userData.password = result.password;
        this.app.userData.userId = result.objectId;

        this.redirect('#/home');

    } catch (err) {
        console.log(err);
    }
}