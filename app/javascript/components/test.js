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
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { amber, green } from '@material-ui/core/colors';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import clsx from 'clsx';
import CloseIcon from '@material-ui/icons/Close';

const variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon,
};

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
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },

}));

function MySnackbarContentWrapper(props) {
  const classes = useStyles();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}


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
        {['日語學習', '必背單字', '我的單字本', '我的學習計畫', '討論區'].map((text, index) => (
          <ListItem button key={text} onClick={() => changePage(text)}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

const transPage = (page) => {
  console.log(page);
  switch (page) {
    case '日語學習':
      document.location.href = "learnJP";
      break;
    case '必背單字':
      document.location.href = "learnVocabulary";
      break;
    case '我的單字本':
      document.location.href = "myVocabulary";
      break;
    case '我的學習計畫':
      document.location.href = "myPlan";
      break;
    case '討論區':
      document.location.href = "discuss";
      break;
  }
}


export default function Navbar(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    email: '',
    password: ''
  });
  const [rvalues, setRvalues] = React.useState({
    email: '',
    password: '',
    confirm_password: ''
  });
  const [snackbar, setSnackbar] = React.useState({
    snackbarOpen: false,
    vertical: 'top',
    horizontal: 'center',
    text: ''
  });

  const { vertical, horizontal, snackbarOpen } = snackbar;
  const [open, setOpen] = React.useState(false);
  const [openRes, setOpenRes] = React.useState(false);
  const [email, setEmail] = React.useState(false);
  const [password, setPassword] = React.useState(false);
  const [passwordConfirm, setPasswordConfirm] = React.useState(false);
  const [state, setState] = React.useState({
    left: false,
  });
  const [loginstate, setLoginstate] = React.useState({
    login: false,
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

    return (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMyAccount}>我的帳號</MenuItem>
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
            <IconButton aria-label="show 4 new mails" color="inherit" onClick={handleMailClick}>
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit" onClick={handleNotificationClick}>
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
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
          <Button color="inherit" onClick={handleLoginOpen}>登入</Button>
          <Button color="inherit" onClick={handleRegisterOpen}>註冊</Button>
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



  const fullList = side => (
    <div
      className={classes.fullList}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {['日語學習', '必背單字', '我的單字本', '我的學習計畫', '討論區'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const formRef = React.createRef();


  const handleMailClick = () => {
    //Rails api
    console.log('run mail click');
  }
  const handleMyAccount = () =>{
    document.location.href = "myAccount";
  }
  const handleNotificationClick = () => {
    console.log('run Notify');
  }
  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handlelogout = event => {
    axios
      .delete('/api/sessions/')
      .then(response => {
        location.reload();
      })
  }
  const handleLogin = event => {
    event.preventDefault();
    const post = {
      email: values.email,
      password: values.password
    }
    axios
      .post('/api/sessions', post)
      .then(response => {
        if (!response.data.error) {
          location.reload();
        }
        else {
          alert('登入失敗，請確認帳號密碼是否正確');
        }
      })
  }
  const handleLoginEmail = event => {
    event.persist();
    setValues(oldValues => ({
      ...oldValues,
      email: event.target.value
    }));

  }
  const handleLoginPassword = event => {
    event.persist();
    setValues(oldValues => ({
      ...oldValues,
      password: event.target.value
    }));
  }
  const handleRegisterOpen = () => {
    //document.location.href = "/learn_users/sign_up";
    //先切換頁面
    setOpenRes(true);
  }
  const handleResClose = () => {
    setOpenRes(false);
  }
  const handleLoginOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }
  const handleIndex = () => {
    document.location.href = "/";
  }
  const handleRegisterEmail = event => {
    event.persist();
    setRvalues(oldValues => ({
      ...oldValues,
      email: event.target.value
    }));
  }
  const handleRegisterPassword = event => {
    event.persist();
    setRvalues(oldValues => ({
      ...oldValues,
      password: event.target.value
    }));
  }
  const handleRegisterConfirmPassword = event => {
    event.persist();
    setRvalues(oldValues => ({
      ...oldValues,
      confirm_password: event.target.value
    }));
  }
  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    //前端驗證
    if (userdataVerfication(rvalues) == true) {
      const post = {
        email: rvalues.email,
        password: rvalues.password,
        confirm_password: rvalues.confirm_password
      }
      axios
        .post('/api/learn_users', post)
        .then(response => {
          if (response.data.learn_user) {
            alert("註冊成功");
            location.reload();
          }
          else {
            handleSnackbarOpen({ vertical: 'top', horizontal: 'center', text: '註冊失敗，帳號已被使用過' })
          }
        })
    }
  }

  const handleSnackbarOpen = (newstate) => {
    setSnackbar({ snackbarOpen: true, ...newstate });
  }

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, snackbarOpen: false });
  }

  //先暫定這樣，之後會修改
  const userdataVerfication = (userdata) => {
    let emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    if (userdata.password != userdata.confirm_password) {
      handleSnackbarOpen({ vertical: 'bottom', horizontal: 'center', text: '密碼跟確認密碼不一致' });
    }
    else if (userdata.password.length < 6) {
      handleSnackbarOpen({ vertical: 'bottom', horizontal: 'center', text: '密碼必須要大於6碼' });
    }
    else if (userdata.email.search(emailRule) == -1) {
      handleSnackbarOpen({ vertical: 'bottom', horizontal: 'center', text: '請輸入正確格式的email' });
    }
    else {
      return true;
    }
  }


  const handleChange = (event) => {
    console.log(event.target.name);
    switch (event.target.name) {
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
      <AppBar position="fixed" style={{ "backgroundColor": "#00AA88" }}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} onClick={toggleDrawer('left', true)} color="inherit" aria-label="menu">

            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} onClick={handleIndex}>
            田卷日語
          </Typography>
          {/* <Button color="inherit" onClick = {handlelogout}>登出</Button> */}
          {navbarState()}
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
                    onChange={handleLoginEmail}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="password"
                    name="password"
                    label="密碼"
                    type="password"
                    autoComplete="current-password"
                    onChange={handleLoginPassword}
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
                onClick={handleLogin}
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
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    onChange={handleRegisterEmail}
                    variant="outlined"
                    required
                    fullWidth
                    id="Registeremail"
                    label="Email"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={handleRegisterPassword}
                    variant="outlined"
                    required
                    fullWidth
                    id="password"
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
                    onChange={handleRegisterConfirmPassword}
                    variant="outlined"
                    required
                    fullWidth
                    name="passwordConfirm"
                    minLength='8'
                    label="確認密碼"
                    type="password"
                    id="RegisterpasswordConfirm"
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
                onClick={handleRegisterSubmit}
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
              <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={snackbarOpen}
                onClose={handleSnackbarClose}
                ContentProps={{
                  'aria-describedby': 'message-id',
                }}
              >
                <MySnackbarContentWrapper
                  variant="error"
                  className={classes.margin}
                  message= {snackbar.text}
                />
              </Snackbar>
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