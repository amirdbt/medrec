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
  const [patient, setPatient] = useState({});
  const [loading, setLoading] = useState(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(match);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchPatient();
  }, []);

  const fetchPatient = async () => {
    setLoading(true);
    const response = await axios.get(
      `https://polar-dusk-61658.herokuapp.com/providers/patient/${match.params.id}
    `,
      {
        headers: { Authorization: `${token}` },
      }
    );
    setPatient(response.data.patient);
    setLoading(false);
    console.log(response.data.patient);
  };

  let history = useHistory();
  const removePatient = (username) => {
    axios
      .patch(
        `https://polar-dusk-61658.herokuapp.com/providers/remove_patient/${username}`,
        {
          headers: { Authorization: `${token}` },
        }
      )
      .then((res) => {
        console.log(res);
        history.push("/all-patients");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="content">
      {loading ? (
        <CircularProgress style={{ marginLeft: "50%" }} />
      ) : (
        <>
          <Breadcrumbs aria-label="breadcrumb">
            <Link to="/all-patients" className={classes.links}>
              All Patients
            </Link>
            <Link
              color="textPrimary"
              aria-current="page"
              className={classes.links}
            >
              Patient
            </Link>
          </Breadcrumbs>
          <Typography variant="h6" style={{ fontStyle: "italic" }}>
            {" "}
            {patient.userName}
          </Typography>
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
              <Tab label="Details" {...a11yProps(0)} />
              <Tab label="Records" {...a11yProps(1)} />
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
                          First Name
                        </TableCell>
                        <TableCell>{patient.firstName}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.text}>
                          Last Name
                        </TableCell>
                        <TableCell>{patient.lastName}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.text}>Email</TableCell>
                        <TableCell>{patient.email}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.text}>Gender</TableCell>
                        <TableCell>{patient.gender}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.text}>
                          User Name
                        </TableCell>
                        <TableCell>{patient.userName}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.text}>
                          Phone Number
                        </TableCell>
                        <TableCell>{patient.phoneNumber}</TableCell>
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
                        <TableCell className={classes.text}>MRID</TableCell>
                        <TableCell>{patient.MRID}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.text}>
                          Date of Birth
                        </TableCell>
                        <TableCell>{patient.dob}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.text}>Genotype</TableCell>
                        <TableCell>{patient.genotype}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.text}>
                          Blood Group
                        </TableCell>
                        <TableCell>{patient.bloodGroup}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.text}>
                          Next of Kin
                        </TableCell>
                        <TableCell>{patient.nextOfKin}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.text}>
                          Next of Kin Contact
                        </TableCell>
                        <TableCell>{patient.nextOfKin_contact}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.text}>
                          Nationality
                        </TableCell>
                        <TableCell>{patient.nationality}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.text}>
                          State of Origin
                        </TableCell>
                        <TableCell>{patient.stateOfOrigin}</TableCell>
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
                      Remove this patient's data if he/she requested that, if
                      not please be aware that what has been deleted can never
                      brough back.
                    </Typography>
                    <div style={{ marginBottom: "20px" }}></div>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to remove this patient?"
                          )
                        )
                          removePatient(patient.userName);
                      }}
                    >
                      <Delete /> Remove Account
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Typography>Coming soon...</Typography>
          </TabPanel>
        </>
      )}
    </div>
  );
};

export default ViewPatient;
