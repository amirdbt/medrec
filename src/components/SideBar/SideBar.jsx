import React, { useState } from "react";
import { Link,useHistory } from "react-router-dom";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  makeStyles,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
} from "@material-ui/core";
import {
  Dashboard,
  AccountCircle,
  Search,
} from "@material-ui/icons";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#000051",
    color: "#fff",
  },
  header: {
    fontSize: "22px",
    textAlign: "center",
    lineHeight: "63px",
    userSelect: "none",
    backgroundColor: "#18227c",
  },
  listItems: {
    padding: "15px",
  },
  iconColor: {
    color: "#bcbcbc",
    fontSize: "20px",
  },
  topBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    backgroundColor: "#ffffff",
  },
  search: {
    display: "flex",
    flexGrow: 1,
  },
  searchIcon: {
    marginRight: "10px",
  },
  appIcons: {
    display: "flex",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
  },
  men: {
    top: 0,
  },
  link1: {
    textDecoration: "none",
    color: "#000000",
  },
}));

const SideBar = () => {
  const [open, setopen] = useState(false);
  let history = useHistory()
  const logout =() =>{
    localStorage.removeItem("token")
    history.push("/signin")
  }

  const handleMenu = () => {
    setopen(true);
  };
  const handleClose = () => {
    setopen(false);
  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar className={classes.topBar} color="default" elevation={0}>
        <Toolbar>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <Search />
            </div>
            <InputBase placeholder="Search..." />
          </div>
          <div />
          <div className={classes.appIcons}>
           
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={handleMenu}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              open={open}
              onClose={handleClose}
              className={classes.men}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              elevation={0}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <Link to="/signin" className={classes.link1}>
                <MenuItem onClick={logout}>Log out</MenuItem>
              </Link>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <div className={classes.toolbar} />
          <header className={classes.header}>MedRecords</header>
          <Divider />
          <List>
            <Link className={classes.link} to="/">
              <ListItem button className={classes.listItems}>
                <ListItemIcon className={classes.iconColor}>
                  <Dashboard />
                </ListItemIcon>
                <Typography variant="h5">Dashboard</Typography>
              </ListItem>
            </Link>
          </List>
        </Drawer>
      </nav>
    </div>
  );
};

export default SideBar;
