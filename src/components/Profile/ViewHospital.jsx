import React from "react";
import {
  Breadcrumbs,
  makeStyles,
  Typography,
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
import Records from "./Records";
import { Link } from "react-router-dom";
import RemoveHospital from "./RemoveHospital";

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

const ViewHospital = ({ match, location }) => {
  console.log(match);
  console.log(location);
  const classes = useStyles();
  const { hospital } = location.state;

  const [value, setValue] = React.useState(0);
  const divRef = React.useRef();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // let history = useHistory();
  // let token = localStorage.getItem("token");
  // const removeHospital = (providername) => {
  //   axios
  //     .patch(
  //       `https://polar-dusk-61658.herokuapp.com/users/remove_provider/${providername}`,
  //       "",
  //       {
  //         headers: { Authorization: `${token}` },
  //       }
  //     )
  //     .then((res) => {
  //       console.log(res);
  //       history.push("/hospitals");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  return (
    <div className="content" ref={divRef}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          to="/hospitals"
          color="textPrimary"
          style={{ fontSize: "20px", textDecoration: "none" }}
        >
          All Hospitals
        </Link>
        <div aria-current="page" className={classes.links}>
          Hospital
        </div>
      </Breadcrumbs>
      <Typography variant="h5" style={{ marginBottom: "20px" }}>
        {hospital.providerName}
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
                <TableHead>
                  <TableRow>
                    <TableCell>Hospital Name</TableCell>
                    <TableCell>{hospital.providerName}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Email</TableCell>
                    <TableCell>{hospital.email}</TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TableContainer component={Paper} elevation={0}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <TableCell>Address</TableCell>
                    <TableCell>{hospital.address}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>State</TableCell>
                    <TableCell>{hospital.state}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Phone Number</TableCell>
                    <TableCell>{hospital.phone_number_main}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Phone Number (2)</TableCell>
                    <TableCell>{hospital.phone_number_two}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Phone Number (3)</TableCell>
                    <TableCell>{hospital.phone_number_three}</TableCell>
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
                  Remove this Hospital if you are sure, if not please be aware
                  that what has been deleted can never be brought back.
                </Typography>
                <div style={{ marginBottom: "20px" }}></div>
                <RemoveHospital providername={hospital.providerName} />
                {/* <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to remove this hospital?"
                      )
                    )
                      removeHospital(hospital.providerName);
                  }}
                >
                  <Delete /> Remove Hospital
                </Button> */}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Records hospital={hospital.providerName} />
      </TabPanel>
    </div>
  );
};

export default ViewHospital;
