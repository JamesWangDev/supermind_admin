export function deleteAllImageReducers(state, action) {
    if (action.type === "DeleteSelectedImage") {
        return {
            deleteImage: action.payload
        };
    }
}
export const selectImageReducer = (state, action) => {
    switch (action.type) {
        case "SELECTEDIMAGE":
            return {
                selectedImage: action.payload
            };
        case "ISMODELOPEN":
            return {
                isModalOpen: action.payload
            };
        case "SETBROWSERIMAGE":
            return {
                setBrowserImage: action.payload
            };
        default:
            return state;
    }
};
export const selectStoredImageReducer = (state, action) => {
    switch (action.type) {
        case "STOREDIMAGE":
            return {
                storedImage: action.payload
            };
    }
};
export const CartReducer = (state, action) => {
    switch (action.type) {
        case "STOREAMOUNT":
            return {
                products: action.payload
            }
    }
}
export const settingReducer = (state, action) => {
    switch (action.type) {
        case "SETTINGIMAGE":
            return {
                setFavicon: action?.favicon?.original_url,
                setLogo: action.logo?.original_url,
                setTitle: action.title,
                setTagline: action.tagline,
                isMultiVendor: action.multiVendor,
                setDelivery: action.delivery,
                setCopyRight: action.copyRight,
                setResponsiveImage: action.responsiveImage,
                setDarkLogo: action.darkLogo,
                setLightLogo: action.lightLogo,
                setTinyLogo: action.tinyLogo,
            }
    }
    switch (action.type) {
        case "ALLBADGE":
            return {
                badges: action.allBadges
            }
    }
    switch (action.type) {
        case "NOTIFICATION":
            return {
                notification: action.notificationPayload
            }
    }
}
