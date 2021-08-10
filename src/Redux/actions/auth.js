import Cookies from "js-cookie";

const logIn = () => {
  
  return {
    type: 'LOGIN'
  };
};

const logOut = () => {
  Cookies.remove(process.env.REACT_APP_TOKEN_NAME)
  window.location.reload()
  return {
    type: 'LOGOUT'
  };
};

export { logIn, logOut };
