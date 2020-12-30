const authActionTypes = {
    LOGIN_REQUEST: "LOGIN_REQUEST",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_FAILURE: "LOGIN_FAILURE",
    LOGOUT_REQUEST: "LOGOUT_REQUEST",
    LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
    LOGOUT_FAILURE: "LOGOUT_FAILURE"
}

const signupActionTypes = {
    SIGNUP_REQUEST: "SIGNUP_REQUEST",
    SIGNUP_SUCCESS: "SIGNUP_SUCCESS",
    SIGNUP_FAILURE: "SIGNUP_FAILURE"
}

const categoryActionTypes = {
    GET_ALL_CATEGORIES_REQUEST: "GET_ALL_CATEGORIES_REQUEST",
    GET_ALL_CATEGORIES_SUCCESS: "GET_ALL_CATEGORIES_SUCCESS",
    GET_ALL_CATEGORIES_FAILURE: "GET_ALL_CATEGORIES_FAILURE",
    ADD_CATEGORY_REQUEST: "ADD_CATEGORY_REQUEST",
    ADD_CATEGORY_SUCCESS: "ADD_CATEGORY_SUCCESS",
    ADD_CATEGORY_FAILURE: "ADD_CATEGORY_FAILURE",
    UPDATE_CATEGORIES_REQUEST: "UPDATE_CATEGORIES_REQUEST",
    UPDATE_CATEGORIES_SUCCESS: "UPDATE_CATEGORIES_SUCCESS",
    UPDATE_CATEGORIES_FAILURE: "UPDATE_CATEGORIES_FAILURE",
    DELETE_CATEGORIES_REQUEST:"DELETE_CATEGORIES_REQUEST",
    DELETE_CATEGORIES_SUCCESS:"DELETE_CATEGORIES_SUCCESS",
    DELETE_CATEGORIES_FAILURE:"DELETE_CATEGORIES_FAILURE"
}


const productActionTypes = {
    ADD_PRODUCT_REQUEST: "ADD_PRODUCT_REQUEST",
    ADD_PRODUCT_SUCCESS: "ADD_PRODUCT_SUCCESS",
    ADD_PRODUCT_FAILURE: "ADD_PRODUCT_FAILURE",
    GET_PRODUCTS_REQUEST: "GET_PRODUCTS_REQUEST",
    GET_PRODUCTS_SUCCESS: "GET_PRODUCTS_SUCCESS",
    GET_PRODUCTS_FAILURE: "GET_PRODUCTS_FAILURE",
}

const initialDataActionTypes = {
    GET_INITIAL_DATA_REQUEST: "GET_INITIAL_DATA_REQUEST",
    GET_INITIAL_DATA_SUCCESS: "GET_INITIAL_DATA_SUCCESS",
    GET_INITIAL_DATA_FAILURE: "GET_INITIAL_DATA_FAILURE"
}

const pageActionTypes = {
    CREATE_PAGE_REQUEST: "CREATE_PAGE_REQUEST",
    CREATE_PAGE_SUCCESS: "CREATE_PAGE_SUCCESS",
    CREATE_PAGE_FAILURE: "CREATE_PAGE_FAILURE"
}

export {authActionTypes, signupActionTypes, categoryActionTypes, productActionTypes, initialDataActionTypes, pageActionTypes}