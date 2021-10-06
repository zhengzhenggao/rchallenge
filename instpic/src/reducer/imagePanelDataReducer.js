const imagePanelDataReducer = (state = {
    sortTime: false,
    descOrder: false,
    data: undefined,
    currentPage: 1,
    totalPage: 5,
    recordPerPage: 5,
    searchUsername: undefined
}, action) => {
    // console.log(state);
    switch (action.type) {
        case "IMAGEPANEL_REFRESH_DATA":
            return {...state, data: action.payload.data};
        case "IMAGEPANEL_REFRESH_PAGINATION":
            return {...state, totalPage: action.payload.totalPage};
        case "IMAGETOOLBAR_CHANGE_SEARCHUSERNAME":
            return {...state, searchUsername: action.payload.searchUsername};
        case "IMAGETOOLBAR_TOGGLE_SORTTIME":
            return {...state, sortTime: !state.sortTime};
        case "IMAGETOOLBAR_TOGGLE_DESCORDER":
            return {...state, descOrder: !state.descOrder};
        case "IMAGEPAGINATION_NAVIPAGE":
            return {...state, currentPage: action.payload.currentPage};
        default:    // Default
            return {...state};
    }
}


export default imagePanelDataReducer;