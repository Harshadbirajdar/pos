import { combineReducers } from "redux";
import supplier from "./supplier";
import category from "./category";
import screen from "./screen";
import purchase from "./purchase";
import sale from "./sale";
import salesman from "./salesman";
import menu from "./menu";
import product from "./product";
import customer from "./customer";
import report from "./report";
import dashboard from "./dashboard";
import exchange from "./exchange";
import location from "./location";
export default combineReducers({
  supplier,
  category,
  screen,
  purchase,
  sale,
  salesman,
  menu,
  product,
  customer,
  report,
  exchange,
  dashboard,
  location,
});
