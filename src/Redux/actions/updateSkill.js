const setSkillScore = (listId, skillId, score) => {
    return {
        type: 'SET_SCORE',
        payload: {
            listId, skillId, score
        }
    }
};
export { setSkillScore }