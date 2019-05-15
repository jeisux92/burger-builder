import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-dad41.firebaseio.com/'
})

export default instance;