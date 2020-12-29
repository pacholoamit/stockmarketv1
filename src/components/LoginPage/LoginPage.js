import React, { useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import toast from 'toasted-notes'
import 'toasted-notes/src/styles.css';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/pacholoamit">
        StockMarketAppv1 by Pacholo Amit
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://images.unsplash.com/photo-1560221328-12fe60f83ab8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1353&q=80)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '15vh'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '70%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    borderRadius: '30px',
    width: '240px',
    padding: '12px 0px 12px 0',

  },
}));

function LoginPage(props) {
  const { history } = props
  const classes = useStyles();
  const email = useRef()
  const password = useRef()
  const { login } = useAuth()
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [errorStateEmail, setErrorStateEmail] = useState(false)
  const [errorStatePassword, setErrorStatePassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  
  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setLoading(true)
      await login(email.current.value, password.current.value)
      toast.notify('✔️ Log-In Successful!', {
        position: 'top-right'
      })
      history.push('/dashboard')
    } catch (err) {
      if (err.code.includes('user')) {
        setErrorEmail(err.message)
        setErrorStateEmail(true)
        console.log(err.code)
      }
      else if (err.code.includes('password')) {
        setErrorPassword(err.message)
        setErrorStatePassword(true)
        console.log(err.code)
      }
      else {
        toast.notify('❌Unable to Log in', {
          position: 'top-right'
        })
      }
      console.log(err)
    }
    setLoading(false)
  }

  function handlePasswordClick() {
    setShowPassword(state => !state)
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              error={errorStateEmail}
              helperText={errorEmail}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              type='email'
              autoFocus
              inputRef={email}
            />
            <TextField
              error={errorStatePassword}
              helperText={errorPassword}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type= {showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              inputRef={password}
              InputProps={{
                endAdornment:
                  showPassword ? <IconButton onClick={handlePasswordClick}> <Visibility /> </IconButton> : <IconButton onClick={handlePasswordClick}><VisibilityOff /></IconButton>
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /><br />
            <Grid item container direction='row' justify='center' alignItems='center'>
              <Button
                disabled={loading}
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
            </Button>
            </Grid>
            <Grid container>
              <Grid item xs>
                <Link onClick={() => history.push('/forgot-password')} variant="body2" style={{ cursor: 'pointer' }}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link onClick={() => history.push('/signup')} variant="body2" style={{ cursor: 'pointer' }}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
export default withRouter(LoginPage)