import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    form: {
        width: '100%',
        marginTop: theme.spacing(3),

    },
}));
export default function MyArticle(props) {
    const classes = useStyles();
    const handleClick = (id) =>{
       console.log(`My Id = ${id}`);
    }
    let lists = props.articleData.map((arti, i) =>
    <Paper key={arti.id} className={classes.root} elevation = {10} onClick={handleClick(arti.id)}>
      <Typography variant="h5" component="h3">
        {arti.title}
      </Typography>
      <Typography component="p">
         {arti.created_at.substring(0, 10)} 建立
       </Typography>
    </Paper>
  )
    React.useEffect(() => {
        console.log(props);
    }, [])

    return (
        <div>
            <h1>我的文章</h1>
            {lists}
        </div>
    );
}