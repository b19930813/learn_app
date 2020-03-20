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
    button: {
        display: "inline-block",
        float: "right",
        marginTop: "2%"
    },
    Title: {
        borderBottom: "medium solid #0066FF",
        marginBottom: "1%"
    },
    h1: {
        display: "inline-block"
    },
}));


export default function CreateArticle(props) {
    const classes = useStyles();
    const [article, setArticle] = React.useState({
        title: '',
        content: ''
    })
    //Check user login
    React.useEffect(() => {
        //set 文章的標題跟內容
        //console.log(props);
        setArticle(oldValues => ({
            ...oldValues,
            title: props.article.title,
            content: props.article.content
        }))
    }, []);

    function check() {
        if (article.title && article.content != '') {
            return true;
        }
        else {
            alert('標題或內容不可留白');
            return false;
        }
    }

    const handleChangeTitle = event => {
        event.persist();
        setArticle(oldValues => ({
            ...oldValues,
            title: event.target.value
        }))
    }

    const handleChangeContent = event => {
        event.persist();
        setArticle(oldValues => ({
            ...oldValues,
            content: event.target.value
        }))
    }

    const handleDeleteArticle = event => {
 
        if (check() == true) {
            const data = {
                userID:props.userData.id
            }
            axios
                .delete(`/api/articles/${props.article.id}`,{data: {userID: props.userData.id}})
                .then(response => {
                    if (response.data.state == 200) {
                        alert('刪除成功');
                        document.location.href = `..`;
                    }
                    else if (response.data.state == 400) {
                        alert('刪除失敗');
                    }
                    else if (response.data.state == 401) {
                        alert("請先登入");
                    }
                    else if (response.data.state == 402) {
                        alert("使用者驗證錯誤");
                    }
                })
        }
    }

    const handleEditArticle = () => {
        if (check() == true) {
            const data = {
                title: article.title,
                content: article.content,
                userID: props.userData.id,
            }
            axios
                .put(`/api/articles/${props.article.id}`, data)
                .then(response => {
                    if (response.data.state == 200) {
                        alert('修改成功');
                    }
                    else if (response.data.state == 400) {
                        alert('修改失敗');
                    }
                    else if (response.data.state == 401) {
                        alert("請先登入");
                    }
                    else if (response.data.state == 402) {
                        alert("使用者驗證錯誤");
                    }
                })
        }
    }

    return (
        <div>
            <div className={classes.Title}>
                <h1 className={classes.h1}>修改文章</h1>
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    style={{ "float": "right" }}
                    onClick={handleDeleteArticle} >
                    刪除文章
            </Button>
            </div>
            <div>
                <TextField
                    className={classes.margin}
                    label="標題"
                    variant="outlined"
                    fullWidth={true}
                    value={article.title}
                    onChange={handleChangeTitle}
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
                    value={article.content}
                    onChange={handleChangeContent}
                />
            </div>
            <div>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    style={{ "float": "right" }}
                    onClick={handleEditArticle} >
                    修改文章
                </Button>
            </div>

        </div>
    );
}