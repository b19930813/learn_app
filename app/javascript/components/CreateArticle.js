import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
        background: '#FFFFFF'
    },
}));


export default function CreateArticle(props) {
    const classes = useStyles();
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');

    //Check user login
    // React.useEffect(() => {
    //     console.log(props);
    //   }, []);

    function check() {
        if (title && content != '') {
            return true;
        }
        else {
            alert('標題或內容不可留白');
            return false;
        }
    }
    const handleCreateArticle = () => {
        if (check() == true) {
            const post = {
                title: title,
                content: content,
            }
            axios
                .post('/api/articles', post)
                .then(response => {
                    if (response.data.state == 200) {
                        alert('新增成功');
                        document.location.href = "articles";
                    }
                    else if (response.data.state == 400) {
                        alert('新增失敗');
                    }
                    else if (response.data.state == 401) {
                        alert("請先登入");
                    }
                    else if(response.data.state == 402){
                        alert("使用者驗證錯誤");
                    }
                })
        }
    }

    const handleTitleChange = event => {
        setTitle(event.target.value);
    }

    const handleContentChange = event => {
        setContent(event.target.value);
    }

    return (
        <div>
            <h1>新增文章</h1>
            <div>
                <TextField
                    className={classes.margin}
                    label="標題"
                    variant="outlined"
                    fullWidth={true}
                    onChange={handleTitleChange}
                />
            </div>
            <br />
            <div>
                <TextField
                    className={classes.margin}
                    label="內容"
                    variant="outlined"
                    fullWidth={true}
                    multiline={true}
                    rows={20}
                    rowsMax={20}
                    onChange={handleContentChange}
                />
            </div>
            <div>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    style={{ "float": "right" }}
                    onClick={handleCreateArticle} >
                    新增文章
                </Button>
            </div>
        </div>
    );
}