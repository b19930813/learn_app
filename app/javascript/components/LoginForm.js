import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(3),

  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  // email: {
  //   disabled: true,
  //   width: "500px",
  // },
  // password: {
  //   width: "500px",
  // },
  // h1: {
  //   marginTop: theme.spacing(3),
  //   width: '100%',
  // }
}));

export default function LoginForm() {
  const classes = useStyles();

  const [email,setEmail] = React.useState('');

  const [password,setPassword] = React.useState('')

  const handlePassword = event => {
    event.persist();
    setPassword(event.target.value);
  }
  
  const handleEmail = event =>{
    event.persist();
    setEmail(event.target.value);
  }

  const handleLogin = event => {
    event.preventDefault();
    const post = {
      email: email,
      password: password
    }
    axios
      .post('/api/sessions', post)
      .then(response => {
        if (!response.data.error) {
          location.reload();
        }
        else {
          alert('登入失敗，請確認帳號密碼是否正確');
          //清空
          setPassword('');
          document.getElementById('password').value = '';
        }
      })
  }

  return (
    <div>   
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
                    onChange={handleEmail}
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
                    onChange={handlePassword}
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="記住我(尚未)"
                    onChange = {() => console.log("run onChange")}
                  />
                </Grid> */}
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
                  {/* <Link href="#" variant="body2">
                    忘記密碼了?(尚未)
                </Link> */}
                </Grid>
              </Grid>
            </form>
    </div>
  );
}