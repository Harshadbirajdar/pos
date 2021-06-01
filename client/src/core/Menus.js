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
import { connect } from "react-redux";
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
const Menus = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List>
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
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <SupervisorAccountIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Supplier" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
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

      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <CategoryIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Category" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
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

export default Menus;
