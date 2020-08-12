import {register as apiRegister} from '../data.js'; 

export default async function register(){
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    this.partial('./templates/register.hbs');
}

export async function registerPost(){
    try{

        const username = this.params.username;
        const password = this.params.password;

        const result = await apiRegister(username, password);

        if(result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        this.redirect('#/login');
    } catch(err){
        console.log(err);
    }
}