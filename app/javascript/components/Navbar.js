import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import axios from 'axios'
import Drawer from '@material-ui/core/Drawer';


const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  button: {
    border: 0,
    color: 'white',
    height: 60,
    padding: '0 30px',
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));

const SideList = props => {
  const { toggleDrawer, changePage, side } = props;
  return (
    <div
      className={useStyles.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
      {['日語學習', '單字記憶', '我的單字本','我的學習計畫'].map((text, index) => (
          <ListItem button key={text} onClick={() => changePage(text)}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );
};



export default function Navbar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openRes, setOpenRes] = React.useState(false);
  const [email,setEmail] = React.useState(false);
  const [password,setPassword] = React.useState(false);
  const [passwordConfirm,setPasswordConfirm] = React.useState(false);
  const [state, setState] = React.useState({
    left: false,
  });
  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [side]: open });
  };


 
  const fullList = side => (
    <div
      className={classes.fullList}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {['日語學習', '單字記憶', '我的單字本','我的學習計畫'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  const formRef = React.createRef();
  const transPage = (page) =>{
    switch(page){
      case '日語學習':
      
      break;
      case '單字記憶':
      break;
      case '我的單字本':
      break;
      case '我的學習計畫':
      break;
    }
  }
  const handleShow = (e) =>{
    console.log(e);
  }
  const handleRegisterOpen = () =>{
    setOpenRes(true);
  }
  const handleResClose = () =>{
    setOpenRes(false);
  }
  const handleLoginOpen = () =>{
    setOpen(true);
  }
  const handleClose = () =>{
    setOpen(false);
  }
  const handleMenuButton = () =>{

  }
  const handleRegisterSubmit = (event) =>{
    event.preventDefault();
    const post = {
        email: email,
        password: password,
        passwordconfirm: passwordConfirm
    }
    //console.log(post);
    axios
      .post('/api/users',post)
      .then(response =>{
          //console.log(response);
          //console.log(response.data);
          if(response.data == "ok"){
            alert('註冊成功，畫面即將跳轉...');
          }
          else{
            alert('發生不明錯誤...');
          }
      })
  }



  const handleChange = (event) =>{
    switch(event.target.name) {
      case 'email':
      setEmail(event.target.value);
      break;
      case 'password':
      setPassword(event.target.value);
      break;
      case 'passwordConfirm':
      setPasswordConfirm(event.target.value);
      break;
    }
  }
  return (
    <div className={classes.root}>
      <AppBar position="fixed" style={{"backgroundColor":"#00AA88"}}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} onClick = {toggleDrawer('left', true)} color="inherit" aria-label="menu">
         
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            田卷日語
          </Typography>
          
          <Button color="inherit" onClick = {handleLoginOpen}>登入</Button>
         
          <Button color="inherit" onClick = {handleRegisterOpen}>註冊</Button>
        </Toolbar>
      </AppBar>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">田卷日語</DialogTitle>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            登入
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="密碼"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="記住我"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
             登入
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  忘記密碼了?
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
        </Box>
      </Container>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            取消
          </Button>
        </DialogActions>
      </Dialog>
      
      <Dialog open={openRes} onClose={handleResClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">田卷日語</DialogTitle>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            註冊
          </Typography>
          <form onSubmit={handleRegisterSubmit}  className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange = {handleChange}
                  variant="outlined"
                  required
                  fullWidth
                  pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
                  title='請輸入正確的Email'
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange = {handleChange}
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  minLength='8'
                  label="密碼"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange = {handleChange}
                  variant="outlined"
                  required
                  fullWidth
                  name="passwordConfirm"
                  minLength='8'
                  label="確認密碼"
                  type="password"
                  id="passwordConfirm"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
             註冊
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  已經有帳號了? 登入
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
        </Box>
      </Container>
        <DialogActions>
          <Button onClick={handleResClose} color="primary">
            取消
          </Button>
        </DialogActions>
      </Dialog>
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
      <SideList
          changePage={pageName => transPage(pageName)}
          toggleDrawer={toggleDrawer}
          side="left"
        />
          </Drawer>
    </div>
  );
}