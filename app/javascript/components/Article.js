import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Pagination from "material-ui-flat-pagination";

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



export default function Article(props) {
  const classes = useStyles();
  const [offset, setOffset] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [articleData,setArticleData] = React.useState({
    article:[],
    user:[]
  })

  React.useEffect(() => {
    //console.log(props);
    setArticleData({article: props.article , user: props.user})
    setCount(props.articleCount);

  }, []);
 
  const handleClick = (id) => event => {
    document.location.href = `articles/${id}`;
  }

  const handlePageClick = event => {
    axios
      .get('/api/articles', {
        params: {
          page: (event / 5) + 1
        }
      })
      .then(response => {
        //console.log(response.data);
        setArticleData({article: response.data.articleDatas , user: response.data.userDatas})
        setCount(response.data.articleCount);
      })
    setOffset(event);
  }


  let lists = articleData.article.map((arti, i) =>
    <Paper key={arti.id} className={classes.root} elevation={10} onClick={handleClick(arti.id)}>
      <Typography variant="h5" component="h3">
        {arti.title}
      </Typography>
      <Typography component="p">
        {articleData.user[i].email} 於 {arti.created_at.substring(0, 10)} 建立文章
       </Typography>
    </Paper>
  )

  return (
    <div>
      <div className={classes.Title}>
        <h1 className={classes.h1}>討論區</h1>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          style={{ "float": "right" }}
          onClick={handleOpenAC} >
          我要發文
      </Button>
      </div>
      {lists}
      <Pagination
        limit={5}
        offset={offset}
        total={count}
        onClick={(e, offset) => handlePageClick(offset)}
      />
    </div>
  );
}