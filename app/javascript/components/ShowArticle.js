import React from 'react';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Message from './Message'
import Answer from './Answer'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',

    },
    Divider:{
        margin: '20px',
        width: '100%',
    },
    Content: {
        paddingLeft: "3%",
        paddingRight: "3%",
        whiteSpace: 'pre-wrap'
    },
    Border :{
        borderLeft: "medium  solid #0066FF",
        paddingLeft: "1%"
    }
}));

export default function ShowArticle(props) {
    const classes = useStyles();
    
    // React.useEffect(() => {
    //     console.log(props);
    // }, []);

    return (
        <div className={classes.root}>
            <div className = {classes.Border}>
            <Typography variant="h4" gutterBottom>
                {props.articleData.title}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                {props.userData} 建立於 : {props.articleData.created_at.substring(0,10)} {props.articleData.created_at.substring(11,19)}
            </Typography>
            <Divider className = {classes.Divider} variant="middle"/>
            <Typography className = {classes.Content}>
                {props.articleData.content}
            </Typography>
            <Divider className = {classes.Divider} variant="middle"/>
            <Message props = {props}/>
            </div>
            <Divider className = {classes.Divider} variant="middle"/>
            {/* 我要回覆 */}
            <Answer props = {props}/>
           
        </div>
    );
}