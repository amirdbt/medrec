import React from "react";
import {
  AppBar,
  Tab,
  Tabs,
  Typography,
  Box,
  makeStyles,
} from "@material-ui/core";
import { AccountBox, AddBox } from "@material-ui/icons";
import Signin from "../SignIn/SiginIn";
import SignUp from "../SignUp/SignUp";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "50%",
    marginLeft: "24%",
  },
  tabs: {
    marginLeft: "24%",
    // marginBottom: "-20px",
  },
}));
const SignInComponent = () => {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          className={classes.tabs}
          aria-label="scrollable force tabs example"
        >
          <Tab label="User Sign up" icon={<AddBox />} {...a11yProps(0)} />
          <Tab label="User Sign in" icon={<AccountBox />} {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <SignUp />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Signin />
      </TabPanel>
    </div>
  );
};

export default SignInComponent;
