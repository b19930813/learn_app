import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(3),

  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: "500px",
  },
  email: {
    disabled: true,
    width: "500px",
  },
  password: {
    width: "500px",
  }
}));
export default function MyAccount(props) {
  const classes = useStyles();
  
  const [rvalues, setRvalues] = React.useState({
    email: '',
    password: '',
    confirm_password: ''
  });

  const handlePassword = event => {
    event.persist();
    setRvalues(oldValues => ({
      ...oldValues,
      password: event.target.value
    }));
  }
  
  const handleConfirmPassword = event =>{
    event.persist();
    setRvalues(oldValues => ({
      ...oldValues,
      confirm_password: event.target.value
    }));
  }
  
  const handleEmail = event =>{
    event.persist();
    setRvalues(oldValues => ({
      ...oldValues,
      email: event.target.value
    }));
  }

  const handleRegister = event => {
    event.preventDefault();
    //前端驗證
    if (userdataVerfication(rvalues) == true) {
      const post = {
        email: email.email,
        password: password.password,
        confirm_password: password.confirm_password

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

  return (
    <div>
      <form className={classes.form} noValidate style={{ "textAlign": "center" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField className={classes.email}
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              onChange = {handleEmail}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField className={classes.password}
              variant="outlined"
              required
              fullWidth
              id="password"
              name="password"
              label="密碼"
              type="password"
              autoComplete="current-password"
              onChange={handlePassword}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField className={classes.password}
              variant="outlined"
              required
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              label="確認密碼"
              type="password"
              autoComplete="current-password"
              onChange={handleConfirmPassword}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleRegister}
        >
          註冊
            </Button>
        <Grid container justify="flex-end">
        </Grid>
      </form>
    </div>
  );
}