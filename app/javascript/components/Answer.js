import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
    Typography: {
        fontSize: "15px",
        textAlign: "right"
    },
    Container: {
        paddingLeft: "2%",
        paddingRight: "2%",
        borderLeft: "medium  solid #6495ED",
        marginTop: "15px",
        marginBottom: "15px",
        whiteSpace: 'pre-wrap'
    },
    button: {
        marginTop: "2%"
    }
}));


export default function Answer(props) {
    const classes = useStyles();
    const [count, setCount] = React.useState(0); //設定有幾個回應
    const [content, setContent] = React.useState('');
    const [datas, setDatas] = React.useState({
        answers: [],
        users: []
    });

    React.useEffect(() => {
        
        getAnswer();
    }, []);

    function getAnswer() {
        axios
            .get('/api/responses', {
                params: {
                    id: props.props.articleData.id
                }
            })
            .then(response => {
                setDatas(oldValues => ({
                    ...oldValues,
                    answers: response.data.answers,
                    users: response.data.userDatas
                }))
                setCount(response.data.count);
            })
    }

    const handleResponseSubmit = () => {
        //打API
        const post = {
            content: content,
            articleID: props.props.articleData.id
        }
        axios
            .post('/api/responses', post)
            .then(response => {
                if (response.data.state == 200) {
                    alert('回答成功');
                    getAnswer();
                }
                else if (response.data.state == 400) {
                    alert('回答失敗');
                }
                else if (response.data.state == 401) {
                    alert("請先登入");
                }
            })
    }
    //帶出渲染前的資料
    let lists = datas.answers.map((answer, i) =>
        <div key={answer.id} className={classes.Container}>
            <Typography >
                {answer.content}
            </Typography>
            <Typography className={classes.Typography}>
                {datas.users[i].email} 於 {answer.created_at.substring(0, 10)} {answer.created_at.substring(11, 19)} 回覆
            </Typography>
            <Divider className={classes.Divider} variant="middle" />
        </div>
    )
    return (
        <div>
            <h1>{count}個回答</h1>
            {lists}
            <h1>我要回答</h1>
            <div>
                <TextField
                    className={classes.test}
                    label="內容"
                    variant="outlined"
                    fullWidth={true}
                    multiline={true}
                    rows={10}
                    rowsMax={10}
                    onChange={() => setContent(event.target.value)}
                    style = {{ background: '#FFFFFF'}}
                />
            </div>
            <div>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    style={{ "float": "right" }}
                    onClick={handleResponseSubmit} >
                    回答
                </Button>
            </div>
        </div>
    );
}