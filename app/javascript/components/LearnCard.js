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
    width: 250,
    display: "inline-block",
    margin: "15px",
  },
  media: {
    height: 140,
  },
  subContent:{
    height: 80,

  }
});

export default function LearnCard() {
  const classes = useStyles();

  return (
    <div>
    <Card className={classes.card}>
         <CardActionArea>
           <CardMedia
             className={classes.media}
             image={require('../pic/N1.png')}
             title="Contemplative Reptile"
           />
           <CardContent>
             <Typography gutterBottom variant="h5" component="h2">
               N1學習筆記
             </Typography>
             <Typography variant="body2" color="textSecondary" component="p" className = {classes.subContent}>
               每天看片片 晚上尻一發 自然可以進步  每天看片自然可以進步...
             </Typography>
           </CardContent>
         </CardActionArea>
         <CardActions>
           <Button size="small" color="primary">
             看更多
           </Button>
         </CardActions>
       </Card>
       <Card className={classes.card}>
         <CardActionArea>
           <CardMedia
             className={classes.media}
             image={require('../pic/N1.png')}
             title="Contemplative Reptile"
           />
           <CardContent>
             <Typography gutterBottom variant="h5" component="h2">
               N1學習筆記
             </Typography>
             <Typography variant="body2" color="textSecondary" component="p" className = {classes.subContent}>
               每天看片片 晚上尻一發 自然可以進步 
             </Typography>
           </CardContent>
         </CardActionArea>
         <CardActions>
           <Button size="small" color="primary">
             看更多
           </Button>
         </CardActions>
       </Card>
       <Card className={classes.card}>
         <CardActionArea>
           <CardMedia
             className={classes.media}
             image={require('../pic/N1.png')}
             title="Contemplative Reptile"
           />
           <CardContent>
             <Typography gutterBottom variant="h5" component="h2">
               N1學習筆記
             </Typography>
             <Typography variant="body2" color="textSecondary" component="p" className = {classes.subContent}>
               每天看片片 晚上尻一發 自然可以進步
             </Typography>
           </CardContent>
         </CardActionArea>
         <CardActions>
           <Button size="small" color="primary">
             看更多
           </Button>
         </CardActions>
       </Card>
       <Card className={classes.card}>
         <CardActionArea>
           <CardMedia
             className={classes.media}
             image={require('../pic/N1.png')}
             title="Contemplative Reptile"
           />
           <CardContent>
             <Typography gutterBottom variant="h5" component="h2">
               N1學習筆記
             </Typography>
             <Typography variant="body2" color="textSecondary" component="p" className = {classes.subContent}>
               每天看片片 晚上尻一發 自然可以進步
             </Typography>
           </CardContent>
         </CardActionArea>
         <CardActions>
           <Button size="small" color="primary">
             看更多
           </Button>
         </CardActions>
       </Card>
       </div>
  );
}