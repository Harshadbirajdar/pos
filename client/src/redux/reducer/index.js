import { combineReducers } from "redux";
import supplier from "./supplier";
import category from "./category";
import screen from "./screen";
import purchase from "./purchase";
import sale from "./sale";
import salesman from "./salesman";
import menu from "./menu";
export default combineReducers({
  supplier,
  category,
  screen,
  purchase,
  sale,
  salesman,
  menu,
});
