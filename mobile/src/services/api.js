import axios from 'axios';

const api = axios.create({
    //Usar:
    //ip do dispositivo conectado no Expo, ou
    //localhost, ou
    //Procure por "localhost ip android emulator" no google
    //OBS: No geral, o ip que aparece no Expo funciona.
    baseURL: 'http://localhost:3333',
});

export default api;