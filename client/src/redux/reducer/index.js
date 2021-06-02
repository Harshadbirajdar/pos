import { combineReducers } from "redux";
import supplier from "./supplier";
import category from "./category";
import screen from "./screen";
import purchase from "./purchase";
export default combineReducers({
  supplier,
  category,
  screen,
  purchase,
});
