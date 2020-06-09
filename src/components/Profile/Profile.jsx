import React, { useState, useEffect } from "react";
import {
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
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Hospitals from "./Hospitals";
import Records from "./Records";

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

const Profile = ({ match }) => {
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(match);
  const token = localStorage.getItem("token");
  let history = useHistory();
  const userName = localStorage.getItem("userName");
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = async () => {
    setLoading(true);
    axios
      .get(`https://polar-dusk-61658.herokuapp.com/users/user_info`, {
        headers: { Authorization: `${token}` },
      })
      .then((res) => {
        console.log(res.data.user);
        setUser(res.data.user);
        setLoading(false);
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
          <Typography variant="h6">{userName}'s Profile</Typography>
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
              <Tab label="Hospitals (Providers)" {...a11yProps(2)} />
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
                        <TableCell>{user.firstName}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.text}>
                          Last Name
                        </TableCell>
                        <TableCell>{user.lastName}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.text}>Email</TableCell>
                        <TableCell>{user.email}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.text}>Gender</TableCell>
                        <TableCell>{user.gender}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.text}>
                          User Name
                        </TableCell>
                        <TableCell>{user.userName}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.text}>
                          Phone Number
                        </TableCell>
                        <TableCell>{user.phoneNumber}</TableCell>
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
                        <TableCell>{user.MRID}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.text}>
                          Date of Birth
                        </TableCell>
                        <TableCell>{user.dob}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.text}>Genotype</TableCell>
                        <TableCell>{user.genotype}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.text}>
                          Blood Group
                        </TableCell>
                        <TableCell>{user.bloodGroup}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.text}>
                          Next of Kin
                        </TableCell>
                        <TableCell>{user.nextOfKin}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.text}>
                          Next of Kin Contact
                        </TableCell>
                        <TableCell>{user.nextOfKin_contact}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.text}>
                          Nationality
                        </TableCell>
                        <TableCell>{user.nationality}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.text}>
                          State of Origin
                        </TableCell>
                        <TableCell>{user.stateOfOrigin}</TableCell>
                      </TableRow>
                    </TableHead>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Records records={user.files} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Hospitals hospitals={user.hospitals} />
          </TabPanel>
        </>
      )}
    </div>
  );
};

export default Profile;
