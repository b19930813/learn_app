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
  },
  h1: {
    marginTop: theme.spacing(3),
    width: '100%',
  }
}));

export default function LoginForm() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    email: '',
    password: ''
  });

  React.useEffect(() => {
    alert("請先登入帳號才能使用功能喔");
},[]);

  const handlePassword = event => {
    event.persist();
    setPassword(oldValues => ({
      ...oldValues,
      password: event.target.value
    }));
  }
  
  const handleEmail = event =>{
    event.persist();
    setEmail(oldValues =>({
      ...oldValues,
      email: event.target.value
    }));
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

  return (
    <div>   
      <form className={classes.form} noValidate style={{ "textAlign": "center" }}>
      <h1>登入</h1>
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
              onChange={handleEmail}
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
        </Grid>
      </form>
    </div>
  );
}