const setOpendListId = (listId, skills) => {
    return {
        type: 'SET_ID',
        payload: {
            listId,
            skills
        }
    }
};
export { setOpendListId }