import Particle from 'particle-api-js';

// Inicializa la libreria de particle para
const particle = new Particle();
const deviceId = "0a10aced202194944a059ff8";
let token = "80b3520b3378184fa88c92846ebbfc448e60a9e8";
// componente  login para reutilizarlo en modulos
const login = async () => {
    if (token) return token; //Si ya hay un token vigente entonces lo devolvemos
    // de otra manera entonces nos logeamos para crear uno nuevo
    try{
        const loginResponse = await particle.login({
            username: '',
            password: '',
        });
        token = loginResponse.body.access_token; // asignamos a la variable token en token generado
        return token; //retornamos el token para hacer solicitudes
    } catch(e){ // si hubo un error en el flujo de codigo lo imprimimos en la consola del cliente
        console.error('Error logging in:', e);
    }
};

export {particle, login, deviceId};