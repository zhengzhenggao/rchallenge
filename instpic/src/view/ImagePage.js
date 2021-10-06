import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// UI Library
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Switch from '@mui/material/Switch';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// View page
import NaviBar from './common/NaviBar';

// Redux actions
import {imagePanelToolbarChangeSearchUsernameAction, 
    imagePanelPaginationNaviAction, imagePanelToolbarToggleSortTimeAction,
    imagePanelToolbarToggleDescOrderAction, imagePanelPaginationRefreshAction,
    imagePanelDataRefreshAction} from '../action/imagePanelDataAction';


    
// Custom Library
// Operator
import ApiOperator from '../operator/ApiOperator';

// Styles object
const styles = {
    ImagePanel: {
        position: "absolute",
        alignItems: "flex-start",
        display: "flex",
        textAlign: "center",
        width: "100vw",
        height: "90vh",
        maxHeight: "95vh",

    },
    ImagePanelToolbarParent: {
        width: "100%",
    },
    ImagePanelToolbarSelf: {
        width: "100%",
        display: "flex",
    },
    ImagePanelPaginationBarParent: {
        position: "absolute",
        top: "90%",
        bottom: "0%"
    },
    ImagePanelPaginationBarSelf: {

    }
}



const ImagePage = () => {
    // Hooks
    const alreadySigned = useSelector(state => state.authenticator.signed);
    const token = useSelector(state => state.authenticator.token);
    const searchUsername = useSelector(state => state.imagePanel.searchUsername);
    const sortTime = useSelector(state => state.imagePanel.sortTime);
    const descOrder = useSelector(state => state.imagePanel.descOrder);
    const imageData = useSelector(state => state.imagePanel.data);
    const totalPage = useSelector(state => state.imagePanel.totalPage);
    const currentPage = useSelector(state => state.imagePanel.currentPage);
    const recordPerPage = useSelector(state => state.imagePanel.recordPerPage);

    // Local hooks
    const [selectedImageData, setSelectedImageData] = React.useState("");
    const [selectedImageDesc, setSelectedImageDesc] = React.useState("");
    const [successSnackbarOpen, setSuccessSnackbarOpen] = React.useState(false);
    const [failSnackbarOpen, setFailSnackbarOpen] = React.useState(false);

    // Redux dispatcher
    const dispatcher = useDispatch();

    // Event Handler function
    const imagePanelPaginationOnchangeHandler = (event) => {
        // console.log(event.target);
        dispatcher(imagePanelPaginationNaviAction({currentPage: parseInt(event.target.textContent)}));
    }

    const ImagePanelToolbarUsernameChangeHandler = (event) => {
        dispatcher(imagePanelToolbarChangeSearchUsernameAction({searchUsername: event.target.value}));
    }

    const ImagePanelToolbarToggleSortTimeHandler = (event) => {
        dispatcher(imagePanelToolbarToggleSortTimeAction());
    }

    const ImagePanelToolbarToggleDescOrderHandler = (event) => {
        dispatcher(imagePanelToolbarToggleDescOrderAction());
    }  

    const ImagePanelToolbarRefreshButtonOnClickHandler = async (event) => {
        var postData = {};
        if (searchUsername !== "" || searchUsername !== undefined)
        {
            postData.filterUsername = searchUsername;
            postData.sortKey = "timestamp";
            if (descOrder && sortTime)
            {
                postData.sortDir = "DESC";
            }else{
                postData.sortDir = "ASC";
            }
        }
        postData.pagination = recordPerPage;   // Every page 10 images, default no change in this UI
        postData.page = currentPage;   


        if (sortTime)
        {
            postData.filterUsername = searchUsername;

        }
        var headerData = {
            authorization: token
        };
        var imageData = await ApiOperator("server", "ListImage", "POST", undefined, postData, headerData, null);
        dispatcher(imagePanelDataRefreshAction(imageData.data));


        // Calculate total page numbers
        var totalPageCount = parseInt(Math.ceil((imageData.data.totalDataCount * 1.0 / (recordPerPage * 1.0)), 1));
        dispatcher(imagePanelPaginationRefreshAction({totalPage: totalPageCount}));


        // console.log("I loaded new data", imageData);
        return;
    }

    const ImageUploadPanelSelectImageHandler = (event) => {
        if (typeof event.target.files[0] !== typeof File) {
            console.log('No file selected, skip file process');
        }

        const reader = new FileReader();
        reader.onload = function (file) {
            const bufferArray = file.target.result;
            const base64String = Buffer.from(bufferArray, "byte").toString("base64");
            console.log(base64String);
            setSelectedImageData(base64String);
        }

        reader.readAsArrayBuffer(event.target.files[0]);
    }

    const ImageUploadPanelUploadImageHandler = async (event) => {
        var headerData = {
            authorization: token
        };
        var postData = {
            desc: selectedImageDesc,
            data: selectedImageData,
        };
        var uploadResult = await ApiOperator("server", "UploadImage", "POST", undefined, postData, headerData, null);
        if (uploadResult !== undefined && uploadResult.success)
        {  
            setSuccessSnackbarOpen(true);

            // Clear current image data
            setSelectedImageData("");
            setSelectedImageDesc("");
        } 
        else
        {
            setFailSnackbarOpen(true);
        }
    }

    // React useEffect functions
    React.useEffect(()=>{
        ImagePanelToolbarRefreshButtonOnClickHandler();
    },[currentPage]);

    // Variables

    // UI Moduler
    const ImagePanelToolbar = () => {
        // Image Panel Toolbar including filter and refresh

        return (
            <Box style={styles.ImagePanelToolbarSelf}>
                <Grid item xs={3}>
                    <FormGroup>
                    <TextField id="outlined-basic" label="Search Username" variant="outlined" 
                    defaultValue={searchUsername} 
                    onFocus={(event)=>{
                        event.target.value = "";
                    }}
                    onBlur={(event)=>{
                        ImagePanelToolbarUsernameChangeHandler(event);
                    }}/>
                    
                    </FormGroup>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={3}>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox  checked={sortTime} 
                        onChange={()=>{ImagePanelToolbarToggleSortTimeHandler();}}/>} label="Sort Time" />
                    </FormGroup>
                </Grid>
                <Grid item xs={3}>
                    <FormGroup>
                        <FormControlLabel control={<Switch  checked={descOrder} disabled={!sortTime}
                        onChange={()=>{ImagePanelToolbarToggleDescOrderHandler()}}/>} label="Descending" />
                    </FormGroup>
                </Grid>
                <Grid item xs={2}>
                    <Button variant="outlined" onClick={(event)=>{ImagePanelToolbarRefreshButtonOnClickHandler(event)}}>Refresh</Button>
                </Grid>
            </Box>
        );
    }

    const ImagePanelPaginationBar = () => {
        return (
            <Stack spacing={2}>
                <Pagination count={totalPage} page={currentPage} onChange={event=>imagePanelPaginationOnchangeHandler(event)}/>
            </Stack>
        );
    }

    const ImagePanel = () => {
        return (
            <ImageList style={{maxHeight: "70vh"}}>
                {imageData !== undefined ? imageData.map((item) => (
                    <ImageListItem key={item.uuid}>
                    <img
                        src={`data:image/png;base64, ${item.image}`}
                        alt={item.uuid}
                        loading="lazy"
                    />
                    <ImageListItemBar
                        title={item.uuid}
                        subtitle={item.desc}
                        position="below"
                    />
                    </ImageListItem>
                )) : null}
                </ImageList>
        );
    }

    const ImageUploadPanel = () => {

        return (
            <Box >
            <Grid item xs={12}>
                <input
                    type="file"
                    onChange={(event)=>{ImageUploadPanelSelectImageHandler(event)}}
                />
                <Grid item xs={12}>
                    <img
                        src={`data:image/png;base64, ${selectedImageData}`}
                        alt={"No image selected"}
                        loading="lazy"
                        style={{scale: "inherit", maxHeight: "10vh"}}
                    />
                </Grid>
                
                <Grid item xs={12}>
                <TextField
                    id="image-description-textbox"
                    label="Description"
                    multiline
                    rows={5}
                    defaultValue={selectedImageDesc}
                    onFocus={(event)=>{event.target.value = selectedImageDesc}}
                    onBlur={(event)=>{
                        setSelectedImageDesc(event.target.value);
                        console.log("Set desc");
                    }}
                />
                </Grid>
                <Grid item xs={12} style={{height: "10vh"}}></Grid>
                <Grid item xs={12}>
                    <Button variant="outlined" onClick={(event)=>{
                        setSelectedImageData("");
                        setSelectedImageDesc("");
                    }}>Reset</Button>
                    <Button variant="outlined" disabled={selectedImageData===""} onClick={(event)=>{
                        ImageUploadPanelUploadImageHandler(event);
                    }}>Upload</Button>
                </Grid>
            </Grid>
            </Box>
        );
    }

    return (
        <>
            {alreadySigned ? null : <Redirect to={"/Login"} />}
            <NaviBar />
            <Snackbar
                open={successSnackbarOpen}
                autoHideDuration={6000}
                onClose={()=>{setSuccessSnackbarOpen(false)}}
            >
                <Alert onClose={()=>{setSuccessSnackbarOpen(false)}} severity="success" sx={{ width: '100%' }}>
                    Upload Successful
                </Alert>
            </Snackbar>
            <Snackbar
                open={failSnackbarOpen}
                autoHideDuration={6000}
                onClose={()=>{setFailSnackbarOpen(false)}}
            >
                <Alert onClose={()=>{setFailSnackbarOpen(false)}} severity="warning" sx={{ width: '100%' }}>
                    Upload Failed
                </Alert>
            </Snackbar>
            <Box style={styles.ImagePanel}>
            <Grid item xs={8}>
                <Grid item xs={12} style={styles.ImagePanelToolbarParent}>
                    <ImagePanelToolbar />
                </Grid>
                <Grid item xs={12}>
                    <ImagePanel />
                </Grid>
                <Grid item xs={12} style={styles.ImagePanelPaginationBarParent}>
                    <ImagePanelPaginationBar />
                </Grid>
            </Grid>
            <Grid item xs={4}>
                <ImageUploadPanel />
            </Grid>
            </Box>
        </>
    );
}

export default ImagePage;