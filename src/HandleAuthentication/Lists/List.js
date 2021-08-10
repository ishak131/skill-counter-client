//import { TabPanel } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import EditAndDeletList from './EditAndDeletList';
import Skill from './Skill';

const List = ({ listIndex, skills, listId, classes }) => {

    const [skillsState, setSkillsState] = useState()

    const compare = (a, b) =>
        b.skillScore - a.skillScore
    /////////////////////////////////////////////
    const setSkillScore = (skillIndex, newScore) => {
        skillsState[skillIndex].skillScore = newScore
        setSkillsState([...skillsState])
    }
    ///////////////////////////////////////////
    useEffect(() => {
        setSkillsState(skills)
    }, [skills, skillsState]);
    /////////////////////////////////////
    return (
        <div className={classes.TapPanel} >
            <ol>
                {skillsState && skillsState.sort(compare).map(({ skillName, skillScore, _id: skillId }, skillIndex) => (
                    <Skill
                        setSkillScore={setSkillScore}
                        key={"skillIdUnderList" + skillId}
                        skillName={skillName}
                        skillId={skillId}
                        listId={listId}
                        skillScore={skillScore}
                        skillIndex={skillIndex}
                    />
                ))}
            </ol>
            <EditAndDeletList listIndex={listIndex} listId={listId} classes={classes} />
        </div>
    );
}

export default List;
