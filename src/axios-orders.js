import Axios from "axios";

const instance = Axios.create({
    baseURL: 'https://burger-builder-oz.firebaseio.com/',
})

export default instance;