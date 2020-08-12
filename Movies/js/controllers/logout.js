import {logout as logoutApi} from '../data.js';

export default async function logout(){
    try{
        const result = await logoutApi();

        if(result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        this.app.userData.username = '';
        this.app.userData.userId = '';

        this.redirect('#/home');

    } catch(err){
        console.log(err);
    }

}