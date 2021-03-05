import { auth } from './../../firebase/utils';

export const resetPasswordAPI = (email) => {
    const config = {
        url: 'http://localhost:3000/login'  
    };

    return new Promise ((resolve, reject) => {
         //the page you want to send the user to once they've reset the password
            //pass the url for the live site or the domain site when the site has gone live 
           auth.sendPasswordResetEmail(email, config)
                //specify what happens if successful
                .then(() => {
                   resolve();
                })
                .catch(() => {
                    const err = ['Email does not exist. Please try again'];
                    reject(err);
        });
    });
};