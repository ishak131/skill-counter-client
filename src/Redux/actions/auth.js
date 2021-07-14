const logIn = () => {
  return {
    type: 'LOGIN'
  };
};

const logOut = () => {
  return {
    type: 'LOGOUT'
  };
};

export { logIn, logOut };
