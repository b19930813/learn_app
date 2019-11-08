import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
}));

export default function Message(props) {
    const classes = useStyles();
    const [message,setMessage] = React.useState({
        messages: []
    });

    React.useEffect(() => {
        //打api到後台去拿Message，根據文章ID後setMessage渲染
        axios
            .get('/api/discusses', {
                params: {
                    level: 1,
                    responseID: props.props.articleData.id
                }
            })
            .then(response => {
                console.log(response);
                setMessage({ messages: response.data.discusses });
            })

        console.log("Message!");
        console.log(props);
    }, []);



    return (
        <div className={classes.root}>

        </div>
    );
}