import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),

  },
  Title: {
    borderBottom: "medium solid #0066FF",
    marginBottom: "1%"
  },
  h1: {
    display: "inline-block"
  },
  button: {
    display: "inline-block",
    float: "right",
    marginTop: "2%"
  }
}));


const handleOpenAC = () => {
  document.location.href = "createArticles";
}



export default function MyArticle(props) {
  const classes = useStyles();

  // React.useEffect(() => {
  //   console.log(props);
  //   props.articleData.map((arti,i)=>{
  //       console.log(arti);
  //   })
  // }, []);

  const handleClick = (id) => event => {
    document.location.href = `learn_users/${props.userData.id}/my_articles/${id}/edit`;
    ///learn_users/:learn_user_id/my_articles/:id/edit
  }

  let lists = props.articleData.map((arti, i) =>
    <Paper key={arti.id} className={classes.root} elevation = {10} onClick={handleClick(arti.id)}>
      <Typography variant="h5" component="h3">
        {arti.title}
      </Typography>
      <Typography component="p">
        {arti.created_at.substring(0, 10)} 建立文章
       </Typography>
    </Paper>
  )

  return (
    <div>
      <div className = {classes.Title}>
        <h1 className={classes.h1}> 我的所有文章 </h1>
      </div>
      {lists}
    </div>
  );
}