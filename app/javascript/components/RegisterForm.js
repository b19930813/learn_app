import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Link from '@material-ui/core/Link';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


const variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon,
};

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(3),

  },
  submit: {
    margin: theme.spacing(3, 0, 2),
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


export default function MyAccount(props) {
  const classes = useStyles();
  const [email,setEmail] = React.useState('');
  const [password,setPassword] = React.useState('');
  const [confirmPassword,setConfirmPassword] = React.useState('');
  const [snackbar, setSnackbar] = React.useState({
    snackbarOpen: false,
    vertical: 'top',
    horizontal: 'center',
    text: ''
  });
  const { vertical, horizontal, snackbarOpen } = snackbar;
  
  
  const handleSnackbarOpen = (newstate) => {
    setSnackbar({ snackbarOpen: true, ...newstate });
  }

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, snackbarOpen: false });
  }

  const handleSubmit = event => {
    event.preventDefault();
    //前端驗證
    if (userdataVerfication() == true) {
      const post = {
        email: email,
        password: password,
        confirm_password: confirmPassword

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
            //清空密碼跟確認密碼
            clear_user_data();
          }
        })
    }
  }
  const clear_user_data = () =>{
    setPassword('');
    setConfirmPassword('');
    document.getElementById('RegisterpasswordConfirm').value = '';
    document.getElementById('password').value = '';
  }
  //先暫定這樣 之後修改
  const userdataVerfication = () => {
    let emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    if (password != confirmPassword) {
      handleSnackbarOpen({ vertical: 'bottom', horizontal: 'center', text: '密碼跟確認密碼不一致' });
      clear_user_data();
    }
    else if (password.length < 6) {
      handleSnackbarOpen({ vertical: 'bottom', horizontal: 'center', text: '密碼必須要大於6碼' });
      clear_user_data();
    }
    else if (email.search(emailRule) == -1) {
      handleSnackbarOpen({ vertical: 'bottom', horizontal: 'center', text: '請輸入正確格式的email' });
      clear_user_data();
    }
    else {
      return true;
    }
  }

  return (
    <div>
    <form className={classes.form} noValidate>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          onChange={()=>setEmail(event.target.value)}
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
          onChange={()=>setPassword(event.target.value)}
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
          onChange={()=>setConfirmPassword(event.target.value)}
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
      onClick={handleSubmit}
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
  );
}