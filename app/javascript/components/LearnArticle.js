import React from 'react';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
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
           
        </div>
    );
}