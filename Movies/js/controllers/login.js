import {login as loginApi} from '../data.js';
import {showInfo, showError} from '../notifications.js';

export default async function login(){
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    this.partial('./templates/login.hbs', this.app.userData);
}

export async function loginPost(){
    try{
        const username = this.params.username;
        const password = this.params.password;

        const result = await loginApi(username, password);

        if(result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        this.app.userData.username = result.username;
        this.app.userData.password = result.password;

        this.redirect('#/home');
    } catch(err){
        console.log(err);
    }

}