import { makeStyles } from "@material-ui/core";
import React from "react"
import { useSelector } from "react-redux";




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
  const ListId = useSelector(state => state.ListReducer)
  console.log(ListId);
  return (
    <div className={root}>
      <h1> Developed By Ishak Saad Awad </h1>
      <form className={addSkillForm}>
        <input type="text" className="inp" placeholder="Write the skill" />
        <button type="submit" className="submit">submit</button>
      </form>
    </div>
  );
}
export default Form;
