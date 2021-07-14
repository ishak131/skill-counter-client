const viewAlertReducer = (
  state = { display: 'none', message: 'somthing went wrong' },
  action
) => {
  const { payload } = action;
  switch (action.type) {
    case 'SHOW':
      return {
        display: 'block',
        message: payload.message,
        severity: payload.severity
      };
    case 'HIDE':
      return {
        display: 'none'
      };
    default:
      return state;
  }
};

export default viewAlertReducer;
