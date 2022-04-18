import { actions } from "./actions";

const INITIAL_STATE = {
  storeProducts: [],
  isLoading: true,
  categories: [],
  isCartOpen: false,
  userCart: [],
  userPurchase: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.setStoreProducts:
      return {
        ...state,
        storeProducts: action.payload,
      };

    case actions.setIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      };

    case actions.setCategories:
      return {
        ...state,
        categories: action.payload,
      };

    case actions.setIsCartOpen:
      return {
        ...state,
        isCartOpen: action.payload,
      };

    case actions.setUserCart:
      return {
        ...state,
        userCart: action.payload,
      };

    case actions.setUserPurchase:
      return {
        ...state,
        userPurchase: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
