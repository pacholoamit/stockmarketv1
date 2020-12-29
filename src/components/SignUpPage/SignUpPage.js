import React, { useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import { useAuth } from '../context/AuthContext'
import { withRouter } from 'react-router-dom'
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
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justify: 'center',
    paddingTop: '10vh'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    height: '80vh',

  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    borderRadius: '30px',
    width: '240px',
    padding: '12px 0px 12px 0',
  },
}));

function SignUpPage(props) {
  const { history } = props
  const classes = useStyles();
  const email = useRef()
  const password = useRef()
  const { signup } = useAuth()
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [errorStateEmail, setErrorStateEmail] = useState(false)
  const [errorStatePassword, setErrorStatePassword] = useState(false)
  const [checkbox, setCheckbox] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  console.log(checkbox)

  function checkboxChange() {
    setCheckbox(prev => !prev)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setLoading(true)
      await signup(email.current.value, password.current.value)
      toast.notify('✔️ Registration Successful!, You are logged in!', {
        position: 'top-right'
      })
      history.push('/dashboard')
    } catch (err) {
      if (err.code.includes('email')) {
        setErrorEmail(err.message)
        setErrorStateEmail(true)
        console.log(err.code)
      }
      else if (err.code.includes('password')) {
        setErrorPassword(err.message)
        setErrorStatePassword(true)
      }
      else {
        toast.notify('❌Unable to Sign Up', {
          position: 'top-right'
        })
      }

    }
    setLoading(false)
  }

  function handlePasswordClick() {
    setShowPassword(state => !state)
  }



  return (
    <Card style={{ paddingBottom: '30px' }} >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign up
        </Typography>

          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  error={errorStateEmail}
                  helperText={errorEmail}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  type='email'
                  inputRef={email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errorStatePassword}
                  helperText={errorPassword}
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="password"
                  inputRef={password}
                  InputProps={{
                    endAdornment:
                      showPassword ? <IconButton onClick={handlePasswordClick}> <Visibility /> </IconButton> : <IconButton onClick={handlePasswordClick}><VisibilityOff /></IconButton>
                  }}
                />
              </Grid>
              <Grid item container xs={12} justify='center'>
                <FormControlLabel
                  control={<Checkbox onClick={checkboxChange} checked={checkbox} color="primary" />}
                  label="I have agreed to the terms & conditions"
                />
              </Grid>

              <Grid item container justify='center' alignItems='center'>
                <Button
                  disabled={loading || !checkbox}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign Up
          </Button>
              </Grid>
              <Grid container justify="center" alignItems>
                <Grid item>
                  <Link onClick={() => { history.push('/login') }} variant="body2" style={{ cursor: 'pointer' }}>
                    Already have an account? Sign in
              </Link>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </Card >

  );
}
export default withRouter(SignUpPage)