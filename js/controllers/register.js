import { register as apiRegister } from '../data.js';

export default async function register(){
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    this.partial('./templates/register.hbs');
}

export async function registerPost(){
    try{

        const email = this.params.email;
        const password = this.params.password;
        const repeatPassword = this.params.repeatPassword;

        if(this.params.email.length < 1)
        {
            throw new Error('Email must be filled');
        }
        if(this.params.password.length < 6)
        {
            throw new Error('Password should be at least 6 characters long');
        }
        if(password !== repeatPassword){
            throw new Error('Passwords should match');
        }

        const result = await apiRegister(email, password);

        if(result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        this.redirect('#/home');
    } catch(err){
        console.log(err);
    }
}