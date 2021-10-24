import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import CategoryIcon from "@material-ui/icons/Category";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ControlPointDuplicateIcon from "@material-ui/icons/ControlPointDuplicate";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import ReceiptIcon from "@material-ui/icons/Receipt";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import AddIcon from "@material-ui/icons/Add";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import FaceIcon from "@material-ui/icons/Face";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import AssessmentIcon from "@material-ui/icons/Assessment";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import DashboardIcon from "@material-ui/icons/Dashboard";
import DonutSmallIcon from "@material-ui/icons/DonutSmall";
import AddLocationIcon from "@material-ui/icons/LocationOn";
import AddLocationAltIcon from "@material-ui/icons/AddLocationRounded";
import EditLocationAltIcon from "@material-ui/icons/EditLocationRounded";
import { connect } from "react-redux";
import {
  categoryState,
  customerState,
  productState,
  reportState,
  salesmanState,
  spplierState,
  locationState,
} from "../redux/action/menu";
import { isAuthenticated } from "../apicall";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));
const Menus = ({
  Supplier,
  changeSupplier,
  Category,
  changeCategory,
  changeSalesman,
  Salesman,
  changeCutomer,
  Customer,
  changeReport,
  Report,
  changeProduct,
  Product,
  Location,
  changeLocation,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { user } = isAuthenticated();
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List>
      <Link to="/">
        <List>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Dashboard"></ListItemText>
          </ListItem>
        </List>
      </Link>
      <Link to="/admin/sale">
        <List>
          <ListItem button>
            <ListItemIcon>
              <ReceiptIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Sale Panel"></ListItemText>
          </ListItem>
        </List>
      </Link>
      <Link to="/admin/exchange">
        <List>
          <ListItem button>
            <ListItemIcon>
              <KeyboardReturnIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Exchange Panel"></ListItemText>
          </ListItem>
        </List>
      </Link>

      <ListItem button onClick={changeProduct}>
        <ListItemIcon>
          <SupervisorAccountIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Product" />
        {Product ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={Product} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="/admin/view/product">
            <List>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <FileCopyIcon />
                </ListItemIcon>
                <ListItemText primary="View Product"></ListItemText>
              </ListItem>
            </List>
          </Link>
          {user.role >= 3 && (
            <Link to="/admin/purchase">
              <List>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <PersonAddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Purchase Entry"></ListItemText>
                </ListItem>
              </List>
            </Link>
          )}
        </List>
      </Collapse>
      {user.role >= 3 && (
        <>
          <ListItem button onClick={changeSupplier}>
            <ListItemIcon>
              <SupervisorAccountIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Supplier" />
            {Supplier ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={Supplier} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to="/admin/add/supplier">
                <List>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <PersonAddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add Supplier"></ListItemText>
                  </ListItem>
                </List>
              </Link>
              <Link to="/admin/view/supplier">
                <List>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <PeopleAltIcon />
                    </ListItemIcon>
                    <ListItemText primary="View suplier"></ListItemText>
                  </ListItem>
                </List>
              </Link>
            </List>
          </Collapse>
        </>
      )}
      {user.role >= 3 && (
        <>
          <ListItem button onClick={changeSalesman}>
            <ListItemIcon>
              <AccessibilityIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Salesman" />
            {Salesman ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={Salesman} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to="/admin/add/salesman">
                <List>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add Salesman"></ListItemText>
                  </ListItem>
                </List>
              </Link>
              <Link to="/admin/view/salesman">
                <List>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <PeopleAltIcon />
                    </ListItemIcon>
                    <ListItemText primary="View Salesman"></ListItemText>
                  </ListItem>
                </List>
              </Link>
            </List>
          </Collapse>
        </>
      )}
      <ListItem button onClick={changeCutomer}>
        <ListItemIcon>
          <FaceIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Customer" />
        {Customer ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={Customer} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="/admin/view/customer">
            <List>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <SupervisedUserCircleIcon />
                </ListItemIcon>
                <ListItemText primary="View Customer"></ListItemText>
              </ListItem>
            </List>
          </Link>
        </List>
      </Collapse>
      {user.role >= 3 && (
        <>
          <ListItem button onClick={changeCategory}>
            <ListItemIcon>
              <CategoryIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Category" />
            {Category ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={Category} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to="/admin/add/category">
                <List>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <ControlPointDuplicateIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add Category"></ListItemText>
                  </ListItem>
                </List>
              </Link>
              <Link to="/admin/view/category">
                <List>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <CategoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="View Category"></ListItemText>
                  </ListItem>
                </List>
              </Link>
              <Link to="/admin/add/barcode/category">
                <List>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <CategoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add Barcode Category"></ListItemText>
                  </ListItem>
                </List>
              </Link>
            </List>
          </Collapse>
        </>
      )}
      {/* Report */}
      <ListItem button onClick={changeReport}>
        <ListItemIcon>
          <AssessmentIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Report" />
        {Report ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={Report} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="/admin/report/sale">
            <List>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <ControlPointDuplicateIcon />
                </ListItemIcon>
                <ListItemText primary="Sale Report"></ListItemText>
              </ListItem>
            </List>
          </Link>
          <Link to="/admin/report/salesman">
            <List>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <DonutSmallIcon />
                </ListItemIcon>
                <ListItemText primary="Salesman Report"></ListItemText>
              </ListItem>
            </List>
          </Link>
        </List>
      </Collapse>
      {/* Location */}
      {user.role >= 3 && (
        <>
          <ListItem button onClick={changeLocation}>
            <ListItemIcon>
              <AddLocationIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Location" />
            {Location ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={Location} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to="/admin/location/add">
                <List>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <AddLocationAltIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add Location"></ListItemText>
                  </ListItem>
                </List>
              </Link>
              <Link to="/admin/report/salesman">
                <List>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <EditLocationAltIcon />
                    </ListItemIcon>
                    <ListItemText primary="Edit Location"></ListItemText>
                  </ListItem>
                </List>
              </Link>
            </List>
          </Collapse>
        </>
      )}
    </List>
  );
};
const mapStateToProps = (state) => ({
  Supplier: state.menu.supplier,
  Category: state.menu.category,
  Salesman: state.menu.salesman,
  Customer: state.menu.customer,
  Report: state.menu.report,
  Product: state.menu.product,
  Location: state.menu.location,
});
const mapDispatchToProps = (dispatch) => ({
  changeSupplier: () => {
    dispatch(spplierState());
  },
  changeCategory: () => {
    dispatch(categoryState());
  },
  changeSalesman: () => {
    dispatch(salesmanState());
  },
  changeCutomer: () => {
    dispatch(customerState());
  },
  changeReport: () => {
    dispatch(reportState());
  },
  changeProduct: () => {
    dispatch(productState());
  },
  changeLocation: () => {
    dispatch(locationState());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Menus);
