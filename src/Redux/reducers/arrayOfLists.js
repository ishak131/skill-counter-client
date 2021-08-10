const arrayOfListsReducer = (state = false, action) => {
    switch (action.type) {
        case 'SET_ARRAY_OF_LISTS':
            return action.payload;
        default:
            return state;
    }
};

export default arrayOfListsReducer;
