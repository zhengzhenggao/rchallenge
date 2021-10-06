import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// UI Library
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// Icon
import Logout from '@mui/icons-material/Logout';


// Redux actions
import {logoutAction} from '../../action/authenticationAction';

const styles = {
    NaviBar: {
        position: "fix",
        alignItems: "flex-end",
        display: "flex",
        textAlign: "center",
        right: "10%"
    }
}

const NaviBar = () => {
    // Redux dispatcher
    const dispatch = useDispatch();


    // Event function
    const userLogoutButtonClickHandler = (event) => {
        dispatch(logoutAction());
    }

    return (
        <>
        <Box style={styles.NaviBar}>
            <Grid item xs={11}>
                <Typography variant="subtitle1" gutterBottom>
                    InstPic
                </Typography>
            </Grid>
            <Grid item xs={1}>
                <Logout fontSize="large" onClick={(event)=>{userLogoutButtonClickHandler(event)}}/>
            </Grid>
        </Box>
        </>
    );
}

export default NaviBar;