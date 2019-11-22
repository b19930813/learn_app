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
  const [password, setPassword] = React.useState({
    password: '',
    confirmPassword: '',
  })

  const handlePassword = event => {
    event.persist();
    setPassword(oldValues => ({
      ...oldValues,
      password: event.target.value
    }));
  }
  
  const handleConfirmPassword = event =>{
    event.persist();
    setPassword(oldValues =>({
      ...oldValues,
      confirmPassword: event.target.value
    }));
  }
  const handleUpdate = event => {
    event.preventDefault();
    if (!passwordConfirm(password.password,password.confirmPassword)) {
      alert("請檢察密碼是否正確，有沒有符合規定，長度必須大於6以上");
    }
    else {
      //update data
      axios
        .put('/api/learn_users/'+props.userData.id,{
            password: password.password,
            confirmPassword: password.confirmPassword,
          })
        .then(response => {
          if (response.data.learn_user) {
             alert("修正成功，按下確認後跳轉至首頁");
             document.location.href = "/";
          }
          else{
            alert("修改失敗，請確認輸入的密碼是否有誤");
          }
        })
    }
  }
  function passwordConfirm(password,password_confirm){
     if(password.length <6) return false;
     if(password!=password_confirm) return false;
     return true;
  }
  return (
    <div>
      <h1 style={{ "textAlign": "center" }}>您的資料:</h1>
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
              disabled
              value= {props.userData.email}
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
          onClick={handleUpdate}
        >
          變更資料
            </Button>
        <Grid container justify="flex-end">
        </Grid>
      </form>
    </div>
  );
}