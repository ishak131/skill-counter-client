const showAlert = (message, severity) => {
  return {
    type: 'SHOW',
    payload: {
      message,
      severity
    }
  };
};

const hideAlert = () => {
  return {
    type: 'HIDE'
  };
};

export { hideAlert, showAlert };
