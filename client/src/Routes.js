import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./page/Home";
import Signin from "./page/Signin";
import CashierRoute from "./apicall/Routes/CashierRoute";
import ManagerRoute from "./apicall/Routes/ManagerRoute";
import AddSupplier from "./manager/AddSupplier";
import { Provider } from "react-redux";
import store from "./redux/store";
import ViewSupplier from "./manager/ViewSupplier";
import AddCategory from "./manager/AddCategory";
import ViewCategory from "./manager/ViewCategory";
import PurchaseEntry from "./manager/PurchaseEntry";
const Routes = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <CashierRoute exact path="/" component={Home} />
          <Route exact path="/signin" component={Signin} />
          <ManagerRoute
            exact
            path="/admin/add/supplier"
            component={AddSupplier}
          />
          <ManagerRoute
            exact
            path="/admin/view/supplier"
            component={ViewSupplier}
          />
          <ManagerRoute
            exact
            path="/admin/add/category"
            component={AddCategory}
          />
          <ManagerRoute
            exact
            path="/admin/view/category"
            component={ViewCategory}
          />
          <ManagerRoute
            exact
            path="/admin/purchase"
            component={PurchaseEntry}
          />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default Routes;
