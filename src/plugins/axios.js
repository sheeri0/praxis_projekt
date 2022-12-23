import Vue from 'vue';
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from '@/router'

const instance = axios.create({
    baseURL: process.env.API_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

instance.interceptors.request.use(request => {
    console.log('Starting Request: ', request)
    if(localStorage.token) {
        var token = localStorage.token;
        request.headers.Authorization = "Bearer "+token;
    }
    return request
});
  
instance.interceptors.response.use(
    response => {
        console.log('Response:', response)
        return response
    },
    error => {
        if(error.response.status==401) {
            localStorage.removeItem("token");
            router.push('login')
        }
        console.log(error.response.status);
        console.log('Error response: ' + JSON.stringify(error))
        // console.log('Emiting api-error event with message ' + error.response.data.message)
        return Promise.reject(error)
    }
);

Vue.use(VueAxios, instance);

export default instance;