import React from 'react';
import Slider from './Slider';
import { makeStyles } from '@material-ui/core/styles';
import News from './News';
import LearnCard from './LearnCard'
const useStyles = makeStyles(theme => ({
    display:{
      display:"inline-block"
    },
    News:{
      width:"40%",
      display:"inline-block",
      paddingLeft:"3%",
    }
  }));
  
export default function HelloWorld() {
  const classes = useStyles();
  return (
    <div >
       <div className={classes.display}>
        <Slider />
       </div>
       <div className={classes.News}>
        <News />
      </div>
      <h1 style = {{"marginTop":"3%"}}>最新文章</h1>
      <LearnCard/>
      <h1 style = {{"marginTop":"3%"}}>熱門文章</h1>
      <LearnCard/>
    </div>
  );
}