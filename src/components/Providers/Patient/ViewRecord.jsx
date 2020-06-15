import React, { useState, useEffect } from "react";
import {
  Breadcrumbs,
  makeStyles,
  Typography,
  CircularProgress,
  Tabs,
  Tab,
  Box,
  AppBar,
  Table,
  Grid,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
  Button,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Files from "./Files";

const useStyles = makeStyles((theme) => ({
  links: {
    textDecoration: "none",
    fontSize: "20px",
    color: "#00004f",
  },
  appbar: {
    backgroundColor: "#fff",
  },
}));

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

const ViewPatient = ({ match }) => {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(match);

  return (
    <div className="content">
      <Breadcrumbs aria-label="breadcrumb">
        <Link to="/all-patients" className={classes.links}>
          Patient
        </Link>
        <Link color="textPrimary" aria-current="page" className={classes.links}>
          Record
        </Link>
      </Breadcrumbs>
      <div style={{ marginTop: "20px" }}></div>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appbar}
      >
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
          <Tab label="Overview" {...a11yProps(0)} />
          <Tab label="Files" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Overview
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Files />
      </TabPanel>
    </div>
  );
};

export default ViewPatient;
