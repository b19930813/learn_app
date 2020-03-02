import React from 'react';
import { Router, Route, hashHistory } from 'react-router'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import MailIcon from '@material-ui/icons/Mail';
import axios from 'axios'
import Drawer from '@material-ui/core/Drawer';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import SideList from './SideList'


const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: "#eee",
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

  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    "fontFamily": "Microsoft JhengHei",
    "fontSize": 16,
  },
  button: {
    border: 0,
    color: 'white',
    height: 60,
    padding: '0 30px',
  },
  icon: {
    fontSize: 20,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
subTitle: {
 marginTop: '2.7%',
 marginLeft: '0.5%',
 padding: "10%"
},
item: {
  padding: "10%"
}
}));


const transPage = (page) => {
  switch (page) {
    case '日語學習':
      document.location.href = "/learnArticles";
      break;
    case '必背單字':
      document.location.href = "/learnVocabulary";
      break;
    case '我的單字本':
      document.location.href = "/myVocabulary";
      break;
    case '我的學習計畫':
      document.location.href = "/myPlan";
      break;
    case '討論區':
      document.location.href = "/articles";
      break;
    case '首頁':
    document.location.href = "/";
    break;
  }
}


export default function Navbar(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openRes, setOpenRes] = React.useState(false);
  const [state, setState] = React.useState({
    left: false,
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const menuId = 'primary-search-account-menu';
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const renderMenu = () => {
    const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
    };
    // React.useEffect(() => {
    //     console.log(props);
    //   }, []);
    return (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={'primary-search-account-menu'}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
        className = {classes.subTitle}
      >
        {/* <h4>{props.userData.email.split('@')[0]}</h4> */}
        <MenuItem onClick={()=> {document.location.href = "/myAccount"}}>我的帳號</MenuItem>
        <MenuItem onClick={()=>{document.location.href = `/learn_users/${props.userData.id}/my_articles`}}>我的文章</MenuItem>
        <MenuItem onClick={handlelogout}>登出</MenuItem>
      </Menu>
    )
  }
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
    
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  let navbarState = () => {
    if (props.userData) {
      return (
        <div>
          {/* <Button color="inherit" onClick = {handlelogout}>登出</Button> */}
          <div className={classes.sectionDesktop}>
           
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
              <p style = {{"fontSize":"14px"}}>{props.userData.email.split('@')[0]}</p>
            </IconButton>
          </div>
          {renderMobileMenu}
          {renderMenu()}
        </div>
      );
    }
    else {
      return (
        <div>
          <Button color="inherit" onClick={()=>setOpen(true)}>登入</Button>
          <Button color="inherit" onClick={()=> setOpenRes(true)}>註冊</Button>
        </div>
      );
    }
  }

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [side]: open });
  };

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handlelogout = event => {
    axios
      .delete(`/api/sessions/${props.userData.id}`)
      .then(response => {
        location.reload();
      })
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" style={{ "backgroundColor": "#00AA88" }}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} onClick={toggleDrawer('left', true)} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} onClick={()=>{document.location.href = "/"}}>
            田卷日語
          </Typography>
          {navbarState()}
        </Toolbar>
      </AppBar>

      <Dialog open={open} onClose={()=>setOpen(false)} aria-labelledby="form-dialog-title">
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
            <LoginForm />
          </div>
          <Box mt={5}>
          </Box>
        </Container>
        <DialogActions>
          <Button onClick={()=>setOpen(false)} color="primary">
            取消
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openRes} onClose={()=>setOpenRes(false)} aria-labelledby="form-dialog-title">
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
            <RegisterForm />
          </div>
          <Box mt={5}>
          </Box>
        </Container>
        <DialogActions>
          <Button onClick={()=>setOpenRes(false)} color="primary">
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