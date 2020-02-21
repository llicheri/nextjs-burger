import { combineReducers } from "redux";
import BurgerBuilder from "./burgerBuilder";
import order from "./order";

export default combineReducers({ burgerBuilder: BurgerBuilder, order: order });
