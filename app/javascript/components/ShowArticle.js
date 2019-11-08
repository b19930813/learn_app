import React from 'react';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CreateMessage from './WantToMessage'
import Message from './Message'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    Divider:{
        margin: '20px',
        width: '100%',
    }
}));

export default function ShowArticle(props) {
    const classes = useStyles();
    React.useEffect(() => {
       // console.log(props);
    }, []);

    return (
        <div className={classes.root}>
            <Typography variant="h4" gutterBottom>
                {props.articleData.title}
            </Typography>
            <Divider className = {classes.Divider} variant="middle"/>
            <Typography variant="body1" gutterBottom>
                {props.articleData.content}
            </Typography>
            <Message props = {props}/>
            <Divider className = {classes.Divider} variant="middle"/>
            <CreateMessage props = {props}/>
            {/* 我要回覆 */}
        </div>
    );
}