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
import { connect } from "react-redux";
import {
  categoryState,
  salesmanState,
  spplierState,
} from "../redux/action/menu";
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
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List>
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
      <Link to="/admin/view/product">
        <List>
          <ListItem button>
            <ListItemIcon>
              <FileCopyIcon />
            </ListItemIcon>
            <ListItemText primary="View Product"></ListItemText>
          </ListItem>
        </List>
      </Link>
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
        </List>
      </Collapse>
    </List>
  );
};
const mapStateToProps = (state) => ({
  Supplier: state.menu.supplier,
  Category: state.menu.category,
  Salesman: state.menu.salesman,
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
});
export default connect(mapStateToProps, mapDispatchToProps)(Menus);
