import React, { useState } from "react"
import Alert from '@material-ui/lab/Alert';
import { useDispatch } from "react-redux";
import { showAlert } from '../../Redux/actions/viewAlert'
import DeleteIcon from '@material-ui/icons/Delete';
import { AlertTitle } from "@material-ui/lab";
import { IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import Cookies from "js-cookie";
import axios from 'axios'


const token = Cookies.get(process.env.REACT_APP_TOKEN_NAME)

const api = axios.create({
  baseURL: process.env.REACT_APP_MY_BACKEND_HOST + "/skill",
  timeout: 1000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    'Content-Type': 'application/json',
    'authorization': `123=${token}`
  }
});


export default function Skills({
  skillId,
  listId,
  skillName,
  skillScore,
  skillIndex
}) {

  const parsedToIntSkillScore = parseInt(skillScore, 10)
  const [count, setSkillScore] = useState(parsedToIntSkillScore);
  const [isShowen, setIsShowen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false)
  const dispatch = useDispatch()

   const updateSkillScore = async (newScore) => {
    const oldScore = count;
    if (newScore < 0)
      return dispatch(showAlert('Skill Score already Zero (0)', 'warning'))
    setSkillScore(newScore)
    try {
      await api.put('/editSkillScore', JSON.stringify(
        {
          skillId,
          listId,
          skillScore: newScore
        }))
    } catch (err) {
      setSkillScore(oldScore)
      dispatch(showAlert(err.response.data, 'error'))
    }
  }

  const deleteMe = async () => {
    await api.delete(`/deleteSkill/${skillId}/${listId}`)
      .then(res => {
        dispatch(showAlert('deleted successfully ', 'success'))
        setIsDeleted(true)
      })
      .catch(err => dispatch(showAlert(err.response.data, 'error')))
  }

  return isDeleted ? <></> : (
    <>
      <li key={"skillIndex-" + skillIndex}>{skillName} : {count}
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


