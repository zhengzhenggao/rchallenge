import authenticationReducer from './authenticationReducer';
import imagePanelDataReducer from './imagePanelDataReducer';

import { combineReducers } from 'redux';

const allReducers = combineReducers({
    authenticator: authenticationReducer,
    imagePanel: imagePanelDataReducer,
});

export default allReducers;