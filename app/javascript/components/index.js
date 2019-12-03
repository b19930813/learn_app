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
      width:"35%",
      display:"inline-block",
      paddingLeft:"3%",
      position: "relative",
    }
  }));
  
export default function Index(props) {
  const classes = useStyles();
// React.useEffect(() => {
//   console.log(props);
// }, [])
  return (
    <div >
       <div className={classes.display}>
        <Slider />
       </div>
       <div className={classes.News}>
        <News />
      </div>
      <h3 style = {{"marginTop":"1%",marginLeft:"12px"}}>最新文章</h3>
      <LearnCard  Data={props.newData}/>
      <h3 style = {{"marginTop":"1%", marginLeft: "12px"}}>熱門文章</h3>
      <LearnCard  Data = {props.popularData}/>
    </div>
  );
} 