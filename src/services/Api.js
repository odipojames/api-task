import axios from 'axios';


//get enviroment variables
const API_HOST=process.env.REACT_APP_BASE_URL|| `https://touchinspiration-0ada.restdb.io/rest`;

const key=process.env.REACT_APP_X_API_KEY || '63be7360969f06502871ad7f';

 


// Set default header. e.g, X-API-KEY
axios.defaults.headers['X-API-KEY'] = key;



export const api ={
    records:{
        display: () => axios.get(`${API_HOST}/sample`),
        edit:(data) => axios.patch(`${API_HOST}/sample/${data._id}`,data),
    },
    
   
}
