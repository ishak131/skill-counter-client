import { makeStyles } from "@material-ui/core";
import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import Cookies from 'js-cookie'
import { showAlert } from '../../Redux/actions/viewAlert'

const token = Cookies.get(process.env.REACT_APP_TOKEN_NAME)
const api = axios.create({
  baseURL: `${process.env.REACT_APP_MY_BACKEND_HOST}/skill`,
  headers: {
    "Access-Control-Allow-Origin": "*",
    'Content-Type': 'application/json',
    'authorization': `123=${token}`
  }
});



const useStyles = makeStyles((theme) => ({

  root: {

  }
  , addSkillForm: {
    justifyContent: "center",
    marginTop: "70px",
    backgroundColor: "antiquewhite",
    display: "flex",
    gap: "50px",
    padding: "50px",
    "& input": {
      height: "30px",
      padding: "5px 15px"
    },
    "& button": {
      fontSize: "14px",
      fontFamily: "cursive !important",
      border: "none",
      padding: "8px",
      borderRadius: "5px",
      display: "inline-block",
      textAlign: "center",
      boxSizing: "border-box",
      backgroundColor: "#f2f4f5"
    }
  }

}))

function Form() {
  const { root, addSkillForm } = useStyles()
  const [userName, setUserName] = useState()
  const { listId, skills } = useSelector(state => state.ListReducer)
  const dispatch = useDispatch()

  const updateSkillScore = async (newScore, skillId) => {
    try {
      await api.put('/editSkillScore', JSON.stringify(
        {
          skillId,
          listId,
          skillScore: newScore
        }))

    } catch (err) {
      return console.log(err);
      /*
      setSkillScore(oldScore)
      dispatch(showAlert(err.response.data, 'error'))
    */
    }
    dispatch(showAlert('skill updated successfully', 'success'))
  }

  const checkIfSkillIsFound = (newSkillName) => {
    console.log(newSkillName);
    skills.map(({ skillScore, skillName, skillId }) => {
      if (newSkillName === skillName)
        return updateSkillScore(skillScore + 1, skillId)
    })

  }

  console.log(listId);
  console.log(skills);
  useEffect(() => {
    const getUserData = async () => {
      await api.get('/getUser')
        .then(res => setUserName(res.data.fullName))
        .catch(err => console.log(err))
    }
    getUserData()
  }, [userName, setUserName]);



  return (
    <div className={root}>
      {userName && <h1> Hi {userName} </h1>}
      <form onSubmit={(e) => {
        e.preventDefault()
        checkIfSkillIsFound(e.target.elements['skillName'].value)
      }} className={addSkillForm}>
        <input type="text" name='skillName' className="inp" placeholder="Write the skill" />
        <button type="submit" className="submit">submit</button>
      </form>
    </div>
  );
}
export default Form;
