import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = ingName => {
  return {
    type: actionTypes.ADD_INGREDIENTS,
    ingredient: ingName
  };
};

export const removeIngredient = ingName => {
  return {
    type: actionTypes.REMOVE_INGREDIENTS,
    ingredient: ingName
  };
};

export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAIL
  };
};

export const initIngredients = () => {
  return dispatch => {
    axios
      .get("https://react-burger-backend-322cf.firebaseio.com/ingredients.json")
      .then(resp => {
        dispatch(setIngredients(resp.data));
      })
      .catch(error => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
