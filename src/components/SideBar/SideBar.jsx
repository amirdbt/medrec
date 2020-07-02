import React from "react";
import { Link, useHistory } from "react-router-dom";
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
  Hidden,
  Chip,
} from "@material-ui/core";
import {
  Dashboard,
  AccountCircle,
  Search,
  Settings,
  PowerSettingsNew,
  AddBox,
  Accessibility,
  AddCircleOutline,
  Share,
  LocalHospital,
} from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#000051",
    color: "#fff",
  },
  header: {
    fontSize: "22px",
    textAlign: "center",
    lineHeight: "50px",
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
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      backgroundColor: "#ffffff",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
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
  link1: {
    textDecoration: "none",
    color: "#000000",
  },
}));

const SideBar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();
  let history = useHistory();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("email");
    localStorage.removeItem("userName");
    localStorage.removeItem("_id");
    history.push("/signin");
  };
  const userName = localStorage.getItem("userName");
  const providerName = localStorage.getItem("providerName");
  const role = localStorage.getItem("role");
  const activate = localStorage.getItem("activate");
  // console.log(activate);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  let display;
  console.log(role === "provider" && activate === "true");
  // console.log("role " + role);
  if (role === "provider" && activate === "true") {
    display = (
      <>
        <Link className={classes.link} to="/all-patients">
          <ListItem button className={classes.listItems}>
            <ListItemIcon className={classes.iconColor}>
              <Accessibility />
            </ListItemIcon>
            <Typography variant="h5">All Patients</Typography>
          </ListItem>
        </Link>
        <Link className={classes.link} to="/create-patient">
          <ListItem button className={classes.listItems}>
            <ListItemIcon className={classes.iconColor}>
              <AddBox />
            </ListItemIcon>
            <Typography variant="h5">Create Patient</Typography>
          </ListItem>
        </Link>
        <Link className={classes.link} to="/add-patient">
          <ListItem button className={classes.listItems}>
            <ListItemIcon className={classes.iconColor}>
              <AddCircleOutline />
            </ListItemIcon>
            <Typography variant="h5">Add Patient</Typography>
          </ListItem>
        </Link>

        {/* <Link className={classes.link} to="/edit-settings">
          <ListItem button className={classes.listItems}>
            <ListItemIcon className={classes.iconColor}>
              <Settings />
            </ListItemIcon>
            <Typography variant="h5">Edit Account</Typography>
          </ListItem>
        </Link> */}
      </>
    );
  } else {
    display = (
      <>
        <Link className={classes.link} to="#">
          <ListItem button className={classes.listItems} disabled>
            <ListItemIcon className={classes.iconColor}>
              <Accessibility />
            </ListItemIcon>
            <Typography variant="h5">All Patients</Typography>
          </ListItem>
        </Link>
        <Link className={classes.link} to="#">
          <ListItem button className={classes.listItems} disabled>
            <ListItemIcon className={classes.iconColor}>
              <AddBox />
            </ListItemIcon>
            <Typography variant="h5">Create Patient</Typography>
          </ListItem>
        </Link>
        <Link className={classes.link} to="#">
          <ListItem button className={classes.listItems} disabled>
            <ListItemIcon className={classes.iconColor}>
              <AddCircleOutline />
            </ListItemIcon>
            <Typography variant="h5">Add Patient</Typography>
          </ListItem>
        </Link>

        {/* <Link className={classes.link} to="#">
          <ListItem button className={classes.listItems} disabled>
            <ListItemIcon className={classes.iconColor}>
              <Settings />
            </ListItemIcon>
            <Typography variant="h5">Edit Account</Typography>
          </ListItem>
        </Link> */}
      </>
    );
  }

  const drawer = (
    <>
      <div className={classes.toolbar} />
      <header className={classes.header}>
        MedRecords <br />
        {role === "provider" ? (
          <Chip label={providerName} style={{ marginTop: "-15px" }} />
        ) : (
          <Chip label={userName} style={{ marginTop: "-15px" }} />
        )}
      </header>

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
        {role === "user" && (
          <>
            <Link className={classes.link} to="/profile">
              <ListItem button className={classes.listItems}>
                <ListItemIcon className={classes.iconColor}>
                  <AccountCircle />
                </ListItemIcon>
                <Typography variant="h5">Profile</Typography>
              </ListItem>
            </Link>
            <Link className={classes.link} to="/share-records">
              <ListItem button className={classes.listItems}>
                <ListItemIcon className={classes.iconColor}>
                  <Share />
                </ListItemIcon>
                <Typography variant="h5">Shared Records</Typography>
              </ListItem>
            </Link>
            <Link className={classes.link} to="/hospitals">
              <ListItem button className={classes.listItems}>
                <ListItemIcon className={classes.iconColor}>
                  <LocalHospital />
                </ListItemIcon>
                <Typography variant="h5">Hospitals</Typography>
              </ListItem>
            </Link>
          </>
        )}
        {role === "provider" && display}
      </List>
    </>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <div className={classes.root}>
      <AppBar className={classes.topBar} color="default" elevation={0}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
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
              <PowerSettingsNew />
            </IconButton>
            <Menu
              open={open}
              onClose={handleClose}
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              elevation={0}
            >
              {role === "user" && (
                <Link to="/profile" className={classes.link1}>
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                </Link>
              )}
              <Link to="/user-component" className={classes.link1}>
                <MenuItem onClick={logout}>Log out</MenuItem>
              </Link>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <nav>
        <Hidden smUp implementation="css">
          <Drawer
            className={classes.drawer}
            container={container}
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
};

export default SideBar;
