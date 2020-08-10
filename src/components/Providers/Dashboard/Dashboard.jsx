import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  Table,
  Grid,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Chip,
} from "@material-ui/core";
import EditProfile from "./EditProfile";
import axios from "axios";
import moment from "moment";
import { Alert, AlertTitle } from "@material-ui/lab";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const [hospital, setHospital] = useState({});
  const [hospitalDetails, setHospitalDetails] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchHospital();
  }, []);

  const fetchHospital = () => {
    setLoading(true);
    axios
      .get(`https://polar-dusk-61658.herokuapp.com/providers`, {
        headers: { Authorization: `${token}` },
      })
      .then((res) => {
        console.log(res.data.providerDetails);
        setHospital(res.data.providerDetails);
        setHospitalDetails(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setLoading(false);
      });
  };
  // const { providerDetails } = hospital;
  // console.log(providerDetails);
  return (
    <div>
      {loading ? (
        <CircularProgress style={{ marginLeft: "50%" }} />
      ) : (
        <>
          {hospital.activate === false ? (
            <Alert severity="warning" style={{ marginBottom: "10px" }}>
              <AlertTitle>Warning</AlertTitle>
              Account is not activated, Please contact admin
            </Alert>
          ) : (
            <div></div>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Card elevation={0}>
                <CardContent>
                  <Typography> Total Patients</Typography>
                  <Typography variant="h4">
                    {hospitalDetails.patientsCreated}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card elevation={0}>
                <CardContent>
                  <Typography>Total Records </Typography>
                  <Typography variant="h4">
                    {hospitalDetails.records}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card elevation={0}>
                <CardContent>
                  <Typography>Total Shared Records</Typography>
                  <Typography variant="h4">
                    {hospitalDetails.sharedRecords}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card elevation={0}>
                <CardContent>
                  <Typography>Joined</Typography>
                  <Typography variant="h4">
                    {" "}
                    {moment(hospital.createdA).format("DD MMM, YYYY")}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Card elevation={0}>
                <CardContent>
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
                              <TableCell>Email Address</TableCell>
                              <TableCell>{hospital.email}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>PRID</TableCell>
                              <TableCell>{hospital.PRID}</TableCell>
                            </TableRow>

                            <TableRow>
                              <TableCell>Status</TableCell>
                              <TableCell>
                                {hospital.activate === false ? (
                                  <Chip
                                    label="Not activated"
                                    color="secondary"
                                  />
                                ) : (
                                  <Chip
                                    label="Activated"
                                    style={{
                                      backgroundColor: "#2e7d32",
                                      color: "white",
                                    }}
                                  />
                                )}
                              </TableCell>
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
                              <TableCell>State</TableCell>
                              <TableCell>{hospital.state}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Address</TableCell>
                              <TableCell>{hospital.address}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Phone Number</TableCell>
                              <TableCell>
                                {hospital.phone_number_main}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Phone Number 2</TableCell>
                              <TableCell>{hospital.phone_number_two}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Phone Number 3</TableCell>
                              <TableCell>
                                {hospital.phone_number_three}
                              </TableCell>
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
                          <div style={{ marginBottom: "20px" }}></div>
                          <EditProfile
                            fetchHospital={fetchHospital}
                            hospital={hospital}
                          />
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
};

export default Dashboard;
