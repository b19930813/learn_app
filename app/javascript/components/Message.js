import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
}));


export default function Message(props) {
    const classes = useStyles();
    const [messages, setMessages] = React.useState({
        datas: []
    });
    const [userdatas, setUserdatas] = React.useState({
        datas: []
    });
  
    const handleClick = () =>{
        //
        console.log(messages.datas);
        messages.datas.map((data,i) =>
        console.log(userdatas.datas[0].email)
    )
    }
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
                setMessages({ datas: response.data.discusses });
                setUserdatas({ datas: response.data.userDatas });

            })

        // console.log("Message!");
        // console.log(props);
    }, []);

 
let lists = messages.datas.map((data, i) =>
<Paper key={data.id} className={classes.root} >
    <Typography component="p">
         : {data.content} 
         {console.log(userdatas.datas[0])}
    </Typography>
</Paper>

)

    return (
        <div className={classes.root}>
           
      {lists}
        </div>
    );
}