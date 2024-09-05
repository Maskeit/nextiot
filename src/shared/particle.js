import Particle from 'particle-api-js';

const particle = new Particle();
let token = "80b3520b3378184fa88c92846ebbfc448e60a9e8";
const login = async () => {
    if (token) return token;

    try{
        const loginResponse = await particle.login({
            username: 'miguelagustin182@gmail.com',
            password: 'Complex99@',
        });
        token = loginResponse.body.access_token;
        return token;
    } catch(e){
        console.error('Error logging in:', e);
    }
};

export {particle, login};