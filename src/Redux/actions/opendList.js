const setOpendListId = (listId) => {
    return {
        type: 'SET_ID',
        payload: {
            listId
        }
    }
};
export { setOpendListId }