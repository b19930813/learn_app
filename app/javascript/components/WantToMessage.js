import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));


export default function WantToMessage(props) {
    const classes = useStyles();
    // React.useEffect(() => {
    //     console.log("gg");
    //     console.log(props.props);
    // }, []);
    const [content, setContent] = React.useState('');

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

    return (
        <div className={classes.root}>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>我要留言</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>

                    <TextField
                        className={classes.test}
                        label="內容"
                        variant="outlined"
                        fullWidth={true}
                        multiline={true}
                        rows={1}
                        rowsMax={3}
                        onChange={handleContentChange}
                    />


                </ExpansionPanelDetails>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    style={{ "float": "right" }}
                    onClick={handleMessageSubmit} >
                    送出
                </Button>
            </ExpansionPanel>
        </div>
    );
}