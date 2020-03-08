import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    width: 220,
    display: "inline-block",
    margin: "15px",
  },
  media: {
    height: 140,
  },
  subContent: {
    height: 80,

  },
  main:{
    display:"inline-block"
  }
});
//重構LearnCard，修正成從後端拉資料
export default function LearnCard(props) {
  const classes = useStyles();
  // React.useEffect(() => {
  //   console.log(props.newData);
  // }, [])
  const handleCardClick = (articleID) => event =>{
    document.location.href = `/read_articles/${articleID}`;
  }

  let lists = props.Data.map((data, i) =>
    <div key={i} className = {classes.main}>
      <Card className={classes.card} onClick = {handleCardClick(data.id)}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={require(`../pic/N${data.level}.png`)}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {data.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" className={classes.subContent} maxLength="15">
              {data.content.substr(0,40)}...
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick = {handleCardClick(data.id)}>
            看更多
           </Button>
        </CardActions>
      </Card>
    </div>
  )


  return (
    <div>
      {lists}
    </div>
  );
}