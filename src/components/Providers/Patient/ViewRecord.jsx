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
} from "@material-ui/core";
import { Link } from "react-router-dom";
import axios from "axios";
import Files from "./Files";
import moment from "moment";
import UpdateRecord from "./UpdateRecord";
import { Alert } from "@material-ui/lab";
import DeleteRecord from "./DeleteRecord";

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

const ViewRecord = ({ match, location }) => {
  const classes = useStyles();
  const [record, setRecord] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [error, setError] = useState(false);
  const token = localStorage.getItem("token");
  console.log(location.state.username);
  useEffect(() => {
    fetchSingleRecord();
  }, []);

  const fetchSingleRecord = () => {
    setLoading(true);
    axios
      .post(
        `https://polar-dusk-61658.herokuapp.com/records/patient/${match.params.id}`,
        "",
        {
          headers: { Authorization: `${token}` },
        }
      )
      .then((res) => {
        console.log(res.data);
        setRecord(res.data.record);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(match);

  return (
    <div className="content">
      {loading ? (
        <CircularProgress style={{ marginLeft: "50%" }} />
      ) : (
        <>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              to={`/all-patients/${location.state.username}`}
              color="textPrimary"
              style={{ fontSize: "20px", textDecoration: "none" }}
            >
              Patient
            </Link>
            <Link aria-current="page" className={classes.links}>
              Record
            </Link>
          </Breadcrumbs>
          {error ? (
            <Alert style={{ marginTop: "20px" }} severity={severity}>
              {message}
            </Alert>
          ) : (
            <div></div>
          )}
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
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TableContainer component={Paper} elevation={0}>
                  <Table aria-label="customized table">
                    <TableHead className={classes.head}>
                      <TableRow>
                        <TableCell className={classes.text}>
                          Record Name
                        </TableCell>
                        <TableCell>{record.record_name}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.text}>
                          Created At
                        </TableCell>
                        <TableCell>
                          {moment(record.createdAt).format("DD MMM, YYYY")}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.text}>
                          Updated At
                        </TableCell>
                        <TableCell>
                          {moment(record.updatedAt).format("DD MMM, YYYY")}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.text}>
                          Total Number Of Files
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TableContainer component={Paper} elevation={0}>
                  <Table aria-label="customized table">
                    <TableHead className={classes.head}>
                      <TableRow>
                        <TableCell className={classes.text}>Ailments</TableCell>
                        <TableCell>{record.ailments}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.text}>
                          Comment about treatment
                        </TableCell>
                        <TableCell>{record.comment}</TableCell>
                      </TableRow>
                    </TableHead>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Card elevation={0}>
                  <CardContent>
                    <Typography>Other Actions</Typography>
                    <hr />
                    <Typography variant="caption">
                      Remove this patient's record if he/she requested that, if
                      not please be aware that what has been deleted can never
                      be brought back.
                    </Typography>
                    <div style={{ marginBottom: "20px" }}></div>
                    <Grid container spacing={6}>
                      <Grid item>
                        {" "}
                        <UpdateRecord
                          fetchSingleRecord={fetchSingleRecord}
                          record={record}
                        />
                      </Grid>
                      <Grid item>
                        <DeleteRecord
                          record_id={record._id}
                          location={location}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Files record={record._id} files={record.files} />
          </TabPanel>
        </>
      )}
    </div>
  );
};

export default ViewRecord;
