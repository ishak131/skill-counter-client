import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { showAlert } from '../../Redux/actions/viewAlert'
import Cookies from "js-cookie";
import axios from 'axios'
import AlertWithOptions from "../../components/AlertWithOptions";
import DeleteIcon from '@material-ui/icons/Delete';
import { Box, IconButton, makeStyles, Tooltip, Typography } from "@material-ui/core";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

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



const useStyles = makeStyles((theme) => ({

  skill: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'space-between',
    gap: "15px",
    "& button": {
      padding: "0px",
      marginLeft: "4px",
    }
  }

}))


export default function Skill({
  skillId,
  listId,
  skillName,
  skillScore,
  skillIndex,
  setSkillScore
}) {

  const parsedToIntSkillScore = parseInt(skillScore, 10)
  const [isShowen, setIsShowen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false)
  const dispatch = useDispatch()
  const classes = useStyles()


  const updateSkillScore = async (newScore) => {
    const oldScore = parsedToIntSkillScore;
    if (newScore < 0)
      return dispatch(showAlert('Skill Score already Zero (0)', 'warning'))
    setSkillScore(skillIndex, newScore)
    try {
      await api.put('/editSkillScore', JSON.stringify(
        {
          skillId, listId, skillScore: newScore
        }))
    } catch (e) {
      setSkillScore(skillIndex, oldScore)
      dispatch(showAlert("Sorry we couldn't update the score", 'error'))
    }
  }

  const deleteMe = async () => {
    await api.delete(`/deleteSkill/${skillId}/${listId}`)
      .then(() => {
        dispatch(showAlert('deleted successfully ', 'success'))
        setIsDeleted(true)
      })
      .catch(err => dispatch(showAlert(err.response.data, 'error')))
  }

  return isDeleted ? <></> : (
    <>
      <Typography variant="h6">
        <li >
          <Box className={classes.skill}>
            <span>
              {skillName} : {parsedToIntSkillScore}
            </span>
            <span>
              <Tooltip title={`Increase ${skillName} score`}>
                <IconButton onClick={() => updateSkillScore(parsedToIntSkillScore + 1)}>
                  <ArrowUpward color="primary" />
                </IconButton>
              </Tooltip>
              <Tooltip title={`Decrease ${skillName} score`}>
                <IconButton onClick={() => updateSkillScore(parsedToIntSkillScore - 1)} disabled={parsedToIntSkillScore < 1 ? true : false} >
                  <ArrowDownward color="primary" />
                </IconButton>
              </Tooltip>
              <Tooltip title={`Delet ${skillName} from list`}>
                <IconButton onClick={() => setIsShowen(true)}>
                  <DeleteIcon color="secondary" />
                </IconButton>
              </Tooltip>
            </span>
          </Box>
        </li>
      </Typography>
      <AlertWithOptions
        isShowen={isShowen}
        action={deleteMe}
        handleClose={() => setIsShowen(false)}
        message={<>Are you really want to delete <strong> {skillName} </strong> Skill This process is irreversible </>}
      />
    </>
  );
}


