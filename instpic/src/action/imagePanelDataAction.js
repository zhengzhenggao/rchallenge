// Image Panel Toolbar Actions
export const imagePanelToolbarChangeSearchUsernameAction = (searchUsernameData) => {
    return {
        type: "IMAGETOOLBAR_CHANGE_SEARCHUSERNAME",
        payload: searchUsernameData
    };
}

export const imagePanelToolbarToggleSortTimeAction = () => {
    return {
        type: "IMAGETOOLBAR_TOGGLE_SORTTIME",
    };
}

export const imagePanelToolbarToggleDescOrderAction = () => {
    return {
        type: "IMAGETOOLBAR_TOGGLE_DESCORDER",
    };
}

// Image Panel Pagination Actions
export const imagePanelPaginationRefreshAction = (paginationData) => {
    return {
        type: "IMAGEPANEL_REFRESH_PAGINATION",
        payload: paginationData,
    };
}

export const imagePanelPaginationNaviAction = (paginationData) => {
    return {
        type: "IMAGEPAGINATION_NAVIPAGE",
        payload: paginationData,
    };
}

// Image Panel Data Action
export const imagePanelDataRefreshAction = (imageData) => {
    return {
        type: "IMAGEPANEL_REFRESH_DATA",
        payload: imageData
    };
}