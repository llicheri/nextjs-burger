import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const INGREDIENT_PRICE = {
  bacon: 0.7,
  cheese: 0.5,
  salad: 0.3,
  meat: 1.5
};

const initState = {
  ingredients: null,
  totalPrice: 4,
  error: false
};

const reducer = (oldState = initState, action) => {
  const state = Object.assign({}, oldState);
  switch (action.type) {
    case actionTypes.ADD_INGREDIENTS:
      const updatedIngredient = {
        [action.ingredient]: state.ingredients[action.ingredient] + 1
      };
      const updatedIngredients = updateObject(
        state.ingredients,
        updatedIngredient
      );
      const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredient]
      };
      return updateObject(state, updatedState);
    case actionTypes.REMOVE_INGREDIENTS:
      state.ingredients = {
        ...state.ingredients,
        [action.ingredient]: state.ingredients[action.ingredient] - 1
      };
      state.totalPrice = state.totalPrice - INGREDIENT_PRICE[action.ingredient];
      break;
    case actionTypes.SET_INGREDIENTS:
      state.ingredients = action.ingredients;
      state.totalPrice = 4;
      state.error = false;
      break;
    case actionTypes.FETCH_INGREDIENTS_FAIL:
      state.error = true;
      break;
    default:
  }
  return state;
};

export default reducer;
