import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
    root: {
        paddingLeft: "5%",
        paddingRight: "5%",
    },
    expansionPanel: {
       // background: 'linear-gradient(45deg, #00AAAA 30%,#00DDDD 90%)',
       marginTop:'10px', 

    },
    text :{
        background: '#FFFFFF'
    },
    button: {
        marginLeft: '10px'
    },
    Container : {
        marginTop: "5px",
        background: '#E0FFFF'
    }
}));


export default function Message(props,level) {
    const classes = useStyles();
    const [datas, setDatas] = React.useState({
        messages: [],
        users: []
    })
    const [content, setContent] = React.useState('');

   function getDiscuss(){
    axios
    .get('/api/discusses', {
        params: {
            level: props.level,
            responseID: props.props.articleData.id
        }
    })
    .then(response => {
        setDatas(oldValues => ({
            ...oldValues,
            messages: response.data.discusses,
            users: response.data.userDatas
        }));
    })
   }

    React.useEffect(() => {
        //打api到後台去拿Message，根據文章ID後setMessage渲染
       // console.log(props);
        getDiscuss();
    }, []);

     
    const handleContentChange = event => {
        setContent(event.target.value);
    }

    const handleMessageSubmit = () => {
        //打API，後端確認是否登入
        const post = {
            content: content,
            responseID: props.props.articleData.id,
            level: 1
        }
        axios
            .post('/api/discusses', post)
            .then(response => {
                if (response.data.state == 200) {
                    alert('留言成功');
                    getDiscuss();
                }
                else if (response.data.state == 400) {
                    alert('新增失敗');
                }
                else if (response.data.state == 401) {
                    alert("請先登入");
                }
                else {
                    console.log(response);
                }
            })
    }


    let lists = datas.messages.map((message, i) =>
        <div key={message.id} className={classes.Container}  >
            <Typography component="p" fontSize={12}>
            {(i+1)}.{datas.users[i].email} - {message.created_at.substring(0,10)} {message.created_at.substring(11,19) }
            <br/>
            {message.content} 
            </Typography>
            <Divider className = {classes.Divider} variant="middle"/>
        </div>
    )

    return (
        <div className={classes.root}>
            {lists}
            <ExpansionPanel className = {classes.expansionPanel}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>我要留言</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>

                    <TextField
                        className={classes.text}
                        label="內容"
                        variant="outlined"
                        fullWidth={true}
                        multiline={true}
                        rows={1}
                        rowsMax={1}
                        onChange={handleContentChange}
                    />
                    <Button
                    className = {classes.button}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    style={{ "float": "right" }}
                    onClick={handleMessageSubmit} >
                    送出
                </Button>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}