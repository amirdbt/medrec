import React from "react";
import {
  AppBar,
  Tab,
  Tabs,
  Typography,
  Box,
  makeStyles,
} from "@material-ui/core";
import { LocalHospital, AddBox } from "@material-ui/icons";
import ProviderSignIn from "../Providers/SignIn/SignIn";
import ProviderSignUp from "../Providers/SignUp/SignUp";

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
    marginLeft: "37%",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0%",
    },
  },
}));
const SignUpComponent = () => {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <AppBar position="static" color="default" elevation={0}>
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
          <Tab label="Provider Sign up" icon={<AddBox />} {...a11yProps(0)} />
          <Tab
            label="Provider Sign in"
            icon={<LocalHospital />}
            {...a11yProps(1)}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ProviderSignUp />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ProviderSignIn />
      </TabPanel>
    </div>
  );
};

export default SignUpComponent;
