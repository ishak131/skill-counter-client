import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Skills from './Skills'


const NameLists = ["list1" , "list2" , "list3"];

const Data1 = [
    { id : 1 , skillName: "teeet", skillScore: "0" },
    { id : 2 , skillName: "ishak", skillScore: "1" },
    { id : 3 , skillName: "ishak", skillScore: "2" },
    { id : 4 , skillName: "ishak", skillScore: "3" }
  ];
  const Data2 = [
    { id : 5 , skillName: "Rania", skillScore: "2" },
    { id : 6 , skillName: "Rania", skillScore: "2" },
    { id : 7 , skillName: "Rania", skillScore: "2" },
    { id : 8 , skillName: "Rania", skillScore: "2" }
  ];
  const Data3 = [
    { id : 9 , skillName: "Rania", skillScore: "2" },
    { id : 10 , skillName: "saklala", skillScore: "2" },
    { id : 11 , skillName: "saklala", skillScore: "2" },
    { id : 12 , skillName: "saklala", skillScore: "2" }
  ];
 


  const dataArr = [
     {id : 13 , listName: "A" , skill: Data1} ,
     {id : 14 , listName: "B" , skill: Data2} , 
     {id : 15 , listName: "C" , skill: Data3}
    ];

function TabPanel(props) {
  
  const { children, value, index,...other } = props;

 
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,

  },
}));


export default function Lists() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue ] = React.useState(0);
  const [data , setData] =React.useState(dataArr) ;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
   const deleteSkill = (listIndex , skillIndex) =>{
    console.log(data);
    
    let dataArr = data[listIndex].skill.splice(skillIndex , 1)
    console.log(dataArr);
    console.log(data);
    setData( dataArr );
    
   }
    
  

   
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          {NameLists.map((title, index) => (
            <Tab label={title} {...a11yProps(index)} />
          ))}
        </Tabs>
      </AppBar>
    
     {data.map(({skill} , listIndex) =>(
  
        <TabPanel value={value} index={listIndex}>
          
           <ol>
            
       {skill.map(({skillName , skillScore} , skillIndex) => (
           
              <Skills skillName={skillName} skillScore={skillScore} skillIndex={skillIndex} deleteSkill={() => deleteSkill(listIndex , skillIndex)} />
             
       ))}
      
        </ol>
        
      </TabPanel>
      
     )
     )}  
      
    </div>
  );
}

