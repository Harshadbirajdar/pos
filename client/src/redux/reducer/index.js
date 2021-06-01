import { combineReducers } from "redux";
import supplier from "./supplier";
import category from "./category";
import screen from "./screen";
export default combineReducers({
  supplier,
  category,
  screen,
});
