const setOpendListId = ( listIndex,listId, skills) => {
    return {
        type: 'SET_ID',
        payload: {
            listIndex,
            listId,
            skills
        }
    }
};
export { setOpendListId }