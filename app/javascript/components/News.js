import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({

    paper: {
        marginBottom: "3%",
        paddingRight: "2%"
    },
    Title: {
      marginLeft: "5%",
      paddingTop: "3%",
      "fontFamily": "Microsoft JhengHei",
      "fontSize": 16,
      "fontWeightLight": 300,
      "fontWeightRegular": 400,
      "fontWeightMedium": 500,
    },
    Date: {
        textAlign:"right",
        paddingBottom: "1%"
    }
}));

export default function News(props) {
    const classes = useStyles();
    const THEME = createMuiTheme({
        // typography: {
        //  "fontFamily": "Microsoft JhengHei",
        //  "fontSize": 12,
        //  "fontWeightLight": 300,
        //  "fontWeightRegular": 400,
        //  "fontWeightMedium": 500,
        // }
     });
    // React.useEffect(() => {
    //     console.log(props);
    // }, []);

    return (
     <MuiThemeProvider theme={THEME}>
            
            <h2>最新消息</h2>
            <Paper className={classes.paper} elevation = {5} >
              
                <Typography variant="h5" component="h3" className = {classes.Title}>
                     增加新的單字量囉，大家快去背吧!
                </Typography>
                <Typography component="p" className = {classes.Date} >
                   2019/11/18
                </Typography>
              
            </Paper>

            <Paper  className={classes.paper}  elevation = {5} >
            <Typography variant="h5" component="h3" className = {classes.Title}>
                    狂賀! 學員全部N1合格!
                </Typography>
                <Typography component="p" className = {classes.Date} >
                   2019/11/18
                </Typography>
            </Paper>

            <Paper  className={classes.paper}  elevation = {5} >
            <Typography variant="h5" component="h3" className = {classes.Title}>
                    目前招生中，0人，感謝支持。
                </Typography>
                <Typography component="p" className = {classes.Date} >
                   2019/11/18
                </Typography>
            </Paper>

            <Paper  className={classes.paper}  elevation = {5} >
            <Typography variant="h5" component="h3" className = {classes.Title}>
                    小田卷日文開設囉!!
                </Typography>
                <Typography component="p" className = {classes.Date} >
                   2019/11/18
                </Typography>
            </Paper>

            <Paper  className={classes.paper}  elevation = {5} >
            <Typography variant="h5" component="h3" className = {classes.Title}>
                    學習日語囉
                </Typography>
                <Typography component="p" className = {classes.Date} >
                   2019/11/18
                </Typography>
            </Paper>
            </MuiThemeProvider>
    );
}