import axios from 'axios';

//get enviroment variables
//const API_HOST=process.env.REACT_APP_BASE_URL;
//const key=process.env.REACT_APP_X_API_KEY 

const API_HOST='https://us-central1-ti-reactjs-test.cloudfunctions.net/app/api';
const key='63be7360969f06502871ad7f';

 


// Set default header. e.g, X-API-KEY
axios.defaults.headers['X-API-KEY'] = key;



export const api ={
    users:{
        getAll: () => axios.get(`${API_HOST}/users`),
        getOne:(id) => axios.get(`${API_HOST}/user/${id}`),
        editUser:(data,id) => axios.patch(`${API_HOST}/user/${id}`,data),
    },
    
   
}
