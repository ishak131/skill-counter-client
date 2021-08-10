import Cookies from 'js-cookie'
import axios from 'axios';


const token = Cookies.get(process.env.REACT_APP_TOKEN_NAME)
const API = axios.create({
    baseURL: `${process.env.REACT_APP_MY_BACKEND_HOST}`,
    headers: {
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
        'authorization': `123=${token}`
    }
});


export default API