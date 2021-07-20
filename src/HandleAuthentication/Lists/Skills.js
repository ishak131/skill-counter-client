import React , {useState} from "react"
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';

export default function Skills({skillName , skillScore , skillIndex , deleteSkill }) {
  const skillS = parseInt(skillScore , 10)
  const [count , setSkillScore] = useState(skillS) ;
  const [isShowen , setIsShowen] = useState(false) ;
  

    return (
      <>
       <li key={skillIndex}>{skillName} : {count}
               <button onClick={() => setSkillScore(count + 1 )}>up</button>
               <button onClick={() => setSkillScore(count - 1 )} className="butt-down">down</button>
               <button className="butt-del" onClick={() => setIsShowen(true)}>delete</button>
               
               </li>
            { isShowen && <Alert severity="warning" 
               action={
                 <>
                <Button  variant="contained" color="primary" size="small" onClick={deleteSkill }>OK </Button>
                <Button  variant="contained" size="small" onClick={() => setIsShowen(false)}>Cancel</Button>
                </>
              }
            className="alert">
              Are you really want to delete this Skill
            
               
              </Alert>
              }
      </>
    );
  }


  