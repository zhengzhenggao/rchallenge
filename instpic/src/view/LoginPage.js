import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// UI Library
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// Redux actions
import {loginAction} from '../action/authenticationAction';

// Custom Library
// Operator
import ApiOperator from '../operator/ApiOperator';


const styles = {
    loginBox: {
        margin: "10%",
        top: '10%',
        position: 'relative',
        alignItems: 'center',
        textAlign: 'center',
    },
  };

const LoginPage = () => {
    // Redux dispatcher
    const dispatch = useDispatch();

    // Hooks
    const [usernameInput, setUsernameInput] = React.useState('');
    const [passwordInput, setPasswordInput] = React.useState('');
    const [loginFailSnackbarOpen, setLoginFailSnackbarOpen] = React.useState(false);
    
    // Redux hook
    const alreadySigned = useSelector(state => state.authenticator.signed);

    // Event function
    const userLoginButtonClickHandler = async (event) => {
        var postData = {
            username: usernameInput,
            password: passwordInput
        };
        var loginResult = await ApiOperator("server", "UserLogin", "POST", undefined, postData, {}, null);
        if (loginResult !== undefined && loginResult.token !== undefined)
        {
            dispatch(loginAction(loginResult));
        }
        else
        {
          setLoginFailSnackbarOpen(true);
        }
    }

    
    return (
    <>
        <Route>
            {alreadySigned ? <Redirect to={"/Image"} /> : ""}
        </Route>
        <Snackbar
                open={loginFailSnackbarOpen}
                autoHideDuration={6000}
                onClose={()=>{setLoginFailSnackbarOpen(false)}}
            >
                <Alert onClose={()=>{setLoginFailSnackbarOpen(false)}} severity="warning" sx={{ width: '100%' }}>
                    Login Failed
                </Alert>
            </Snackbar>
        <Box sx={{ flexGrow: 1 }} style={styles.loginBox}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField id="outlined-basic" label="Username" variant="outlined" onChange={(event)=>{
                setUsernameInput(event.target.value);
            }}/>
          </Grid>
          <Grid item xs={12}>
            <TextField id="outlined-basic" label="Password" variant="outlined" type="password" onChange={(event)=>{
                setPasswordInput(event.target.value);
            }}/>
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" onClick={(event)=>{userLoginButtonClickHandler(event)}}>Login</Button>
          </Grid>
        </Grid>
      </Box>
    </>
    );
}


export default LoginPage;