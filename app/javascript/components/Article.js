import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}));


const handleOpenAC = () =>{
  document.location.href = "createArticles";
}



export default function Article(props) {
  const classes = useStyles();

  React.useEffect(() => {
    console.log(props);
  }, []);

  const handleClick =(id)=> event =>{
    document.location.href =`articles/${id}`;
  }
  let lists = props.article.map((arti, i) =>
  <Paper key = {arti.id} className={classes.root} onClick = {handleClick(arti.id)}>
       <Typography  variant="h5" component="h3">
        {arti.title}
       </Typography>
       <Typography component="p">
       {props.user[i].email} 於 {arti.created_at.substring(0,10)} 建立文章
       </Typography>
  </Paper>
 )

  return (
    <div>
      <div  style={{"display":"inline-block"}}>
       <h1>討論區</h1>
       </div>
       <div  style={{"display":"inline-block","float":"right"}}>
       <Button 
       variant="contained" 
       color="primary" 
       className={classes.button}
       style={{ "float":"right" }}
       onClick = {handleOpenAC} >
        我要發文
      </Button>
      </div>
  

       {lists}
    </div>
  );
}