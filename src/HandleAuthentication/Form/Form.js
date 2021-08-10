import { Button, makeStyles, TextField } from "@material-ui/core";
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import Cookies from 'js-cookie'
import { showAlert } from '../../Redux/actions/viewAlert'
import AlertWithOptions from "../../components/AlertWithOptions";
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import { setArrayOfLists } from "../../Redux/actions/arrayOfLists";
import { AddToPhotos } from "@material-ui/icons";

const token = Cookies.get(process.env.REACT_APP_TOKEN_NAME)
const api = axios.create({
  baseURL: `${process.env.REACT_APP_MY_BACKEND_HOST}`,
  headers: {
    "Access-Control-Allow-Origin": "*",
    'Content-Type': 'application/json',
    'authorization': `123=${token}`
  }
});



const useStyles = makeStyles((theme) => ({

  addSkillForm: {
    justifyContent: "center",
    backgroundColor: "antiquewhite",
    display: "flex",
    gap: "50px",
    padding: "50px",
  }

}))

function Form() {

  const { root, addSkillForm } = useStyles()
  const [isShowen, setIsShowen] = useState(false);
  const [isSimilarSkill, setIsSimilar] = useState('');
  const [newSkillName, setNewSkillName] = useState()

  const { listIndex, listId, skills } = useSelector(state => state.ListReducer)
  const arrayOfLists = useSelector(state => state.arrayOfListsReducer)
  const dispatch = useDispatch()

  const addSkillToMyList = async () => {
    await api.post('/skill/createNewSkill', { skillName: newSkillName, listId }).then((res) => {
      dispatch(showAlert("skill is added ", 'success'))
      return addSkillInReduxState(res)
    }).catch(() => {
      dispatch(showAlert("Sorry somthing went wrong", 'error'))
    })
    setIsShowen(false)
  }

  const addSkillInReduxState = (res) => {
    arrayOfLists[listIndex].skills.push(res.data.skill)
    dispatch(setArrayOfLists([...arrayOfLists]))
  }


  const checkIfSkillIsFound = () => {
    if (!newSkillName || newSkillName.lentgh < 1) {
      return dispatch(showAlert("Write a Skill please", 'warning'))
    }
    if (!listId)
      return dispatch(showAlert("You didn't choose the list or didn't add any lists", 'warning'))
    const newSkillNameInUpperCaseAndNoSpace = newSkillName.replace(/ /g, "").toUpperCase()
    if (skills.lentgh < 1)
      return addSkillToMyList(newSkillName)
    ///////////////////////////////////////////////////////
    const isIisIdentical =
      skills.find(({ skillName }) => {
        const skillNameInUpperCaseWithoutSpace = skillName.replace(/ /g, "").toUpperCase()
        return newSkillNameInUpperCaseAndNoSpace === skillNameInUpperCaseWithoutSpace
      })
    if (isIisIdentical) {
      return dispatch(showAlert("this skill already exists", 'info'))
    }
    ///////////////////////////////////////////////////////

    const isSimilar = skills.find(({ skillName }) => {
      const skillNameInUpperCaseWithoutSpace = skillName.replace(/ /g, "").toUpperCase()
      return newSkillNameInUpperCaseAndNoSpace.includes(skillNameInUpperCaseWithoutSpace)
        || skillNameInUpperCaseWithoutSpace.includes(newSkillNameInUpperCaseAndNoSpace)
    })
    if (isSimilar) {
      setIsSimilar(isSimilar.skillName)
      return setIsShowen(true)
    }

    ///////////////////////////////////////////////////////

    return addSkillToMyList(newSkillName)
  }
  /////////////////////////////////////////////

  ///////////////////////////////////////////////////////////
  return (
    <div className={root}>
      <form onSubmit={(e) => {
        e.preventDefault()
        checkIfSkillIsFound()
      }} className={addSkillForm}>
        <TextField variant="outlined"
          fullWidth
          onChange={(e) => setNewSkillName(e.target.value)}
          type="text"
          name='skillName'
          label="Write the skill" />
        <Button
          variant="contained"
          startIcon={<AddToPhotos />}
          type="submit"
          color="primary"
        >
          Add
        </Button>
      </form>
      <AlertWithOptions
        isShowen={isShowen}
        tooltipTitle="add skill"
        icon={
          <LibraryAddIcon color="primary" />
        }
        handleClose={() => setIsShowen(false)}
        action={() => { addSkillToMyList() }}
        message={<>This <strong> list </strong> has a similar<strong> skill</strong> called <strong> " {isSimilarSkill} " </strong> do you want to add it or no</>}
      />
    </div>
  );
}
export default Form;
