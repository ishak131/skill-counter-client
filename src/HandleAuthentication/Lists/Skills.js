import React, { useState } from "react"
import Alert from '@material-ui/lab/Alert';
import { useDispatch } from "react-redux";
import { showAlert } from '../../Redux/actions/viewAlert'
import DeleteIcon from '@material-ui/icons/Delete';
import { AlertTitle } from "@material-ui/lab";
import { IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';


export default function Skills({ skillName, skillScore, skillIndex, deleteSkill }) {

  const parsedToIntSkillScore = parseInt(skillScore, 10)
  const [count, setSkillScore] = useState(parsedToIntSkillScore);
  const [isShowen, setIsShowen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false)
  const dispatch = useDispatch()

  const updateSkillScore = (newScore) => {
    if (newScore < 0)
      return dispatch(showAlert('Skill Score already Zero (0)', 'warning'))
    setSkillScore(newScore)
  }

  const deleteMe = () => {
    setIsDeleted(true)
  }

  return isDeleted ? <></> : (
    <>
      <li key={skillIndex}>{skillName} : {count}
        <button onClick={() => updateSkillScore(count + 1)}>up</button>
        <button disabled={count < 1 ? true : false} onClick={() => updateSkillScore(count - 1)} className="butt-down">down</button>
        <button className="butt-del" onClick={() => setIsShowen(true)}>delete</button>
      </li>
      {isShowen && <Alert severity="warning" className="alert">
        <AlertTitle> Warning </AlertTitle>
        <span className="alert-message"> Are you really want to delete <strong> {skillName} </strong> Skill This process is irreversible </span>
        <br />
        <div className='alert-actions'>
          <IconButton
            variant="contained"
            color="secondary"
            onClick={deleteMe}
            size="small"
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            variant="contained"
            color="primary"
            onClick={() => setIsShowen(false)}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </div>
      </Alert>
      }
    </>
  );
}


