import axios from "axios";

// ACTIONS

export const actions = {
  setStoreProducts: "SET_STORE_PRODUCTS",
  setIsLoading: "SET_IS_LOADING",
  setCategories: "SET_CATEGORIES",
  setIsCartOpen: "SET_IS_CART_OPEN",
  setUserCart: "SET_USER_CART",
  setUserPurchase: "SET_USER_PURCHASE",
};

export const setStoreProducts = (storeProducts) => ({
  type: actions.setStoreProducts,
  payload: storeProducts,
});

export const setIsLoading = (isLoading) => ({
  type: actions.setIsLoading,
  payload: isLoading,
});

export const setCategories = (categories) => ({
  type: actions.setCategories,
  payload: categories,
});

export const setIsCartOpen = (isCartOpen) => ({
  type: actions.setIsCartOpen,
  payload: isCartOpen,
});

export const setUserCart = (userCart) => ({
  type: actions.setUserCart,
  payload: userCart,
});

export const setUserPurchase = (userPurchase) => ({
  type: actions.setUserPurchase,
  payload: userPurchase,
});

// ACTIONS THUNK

const getConfig = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export const getStoreProductsThunk = () => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
      .get("https://ecommerce-api-react.herokuapp.com/api/v1/products")
      .then((res) => dispatch(setStoreProducts(res.data.data.products)))
      .finally(() => dispatch(setIsLoading(false)));
  };
};

export const getCategoriesThunk = () => {
  return (dispatch) => {
    return axios
      .get(
        "https://ecommerce-api-react.herokuapp.com/api/v1/products/categories"
      )
      .then((res) => dispatch(setCategories(res.data.data.categories)));
  };
};

export const filterCategoryThunk = (id) => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
      .get(
        `https://ecommerce-api-react.herokuapp.com/api/v1/products/?category=${id}`
      )
      .then((res) => dispatch(setStoreProducts(res.data.data.products)))
      .finally(() => dispatch(setIsLoading(false)));
  };
};

export const filterByProductNameThunk = (productSearch) => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
      .get(
        `https://ecommerce-api-react.herokuapp.com/api/v1/products/?query=${productSearch}`
      )
      .then((res) => dispatch(setStoreProducts(res.data.data.products)))
      .finally(() => dispatch(setIsLoading(false)));
  };
};

export const loginThunk = (loginCredentials) => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
      .post(
        "https://ecommerce-api-react.herokuapp.com/api/v1/users/login",
        loginCredentials
      )
      .finally(() => dispatch(setIsLoading(false)));
  };
};

export const addToCartThunk = (item) => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
      .post(
        "https://ecommerce-api-react.herokuapp.com/api/v1/cart",
        item,
        getConfig()
      )
      .finally(() => dispatch(setIsLoading(false)));
  };
};

export const getUserCartThunk = () => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
      .get("https://ecommerce-api-react.herokuapp.com/api/v1/cart", getConfig())
      .then((res) => dispatch(setUserCart(res.data.data.cart.products)))
      .finally(() => dispatch(setIsLoading(false)));
  };
};

export const deleteCartItemThunk = (id) => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
      .delete(
        `https://ecommerce-api-react.herokuapp.com/api/v1/cart/${id}`,
        getConfig()
      )
      .then(() => dispatch(getUserCartThunk()))
      .finally(() => dispatch(setIsLoading(false)));
  };
};

export const getUserPurchaseThunk = () => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
      .get(
        "https://ecommerce-api-react.herokuapp.com/api/v1/purchases",

        getConfig()
      )
      .then((res) => dispatch(setUserPurchase(res.data.data.purchases)))
      .finally(() => dispatch(setIsLoading(false)));
  };
};

export const purchaseThunk = () => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
      .post(
        "https://ecommerce-api-react.herokuapp.com/api/v1/purchases",
        {},
        getConfig()
      )
      .finally(() => dispatch(setIsLoading(false)));
  };
};
