import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  makeStyles,
  CircularProgress,
  IconButton,
} from "@material-ui/core";
import { AccountCircle, ArrowForward } from "@material-ui/icons";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  head: {
    backgroundColor: "#1a237e",
    color: theme.palette.common.white,
  },
  text: {
    color: "#fff",
  },
}));

const AllPatients = () => {
  const [patients, setPatients] = useState([]);
  const [totalPatients, setTotalPatients] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const classes = useStyles();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    setLoading(true);
    const response = await axios.get(
      `https://polar-dusk-61658.herokuapp.com/providers/all_patients`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setPatients(response.data.patients);
    setTotalPatients(response.data.totalPatients);
    setLoading(false);
    console.log(response.data);
  };

  return (
    <div className="content">
      {loading ? (
        <CircularProgress style={{ marginLeft: "50%" }} />
      ) : (
        <>
          <Card
            elevation={0}
            style={{
              background: "rgb(63,94,251)",
              background:
                " radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(16,31,62,1) 100%)",
            }}
          >
            <CardContent>
              <div style={{ display: "flex" }}>
                <AccountCircle
                  style={{
                    color: "#fff",
                    fontSize: "40px",
                    marginRight: "5px",
                  }}
                />
                <Typography variant="h5" style={{ color: "#fff" }}>
                  {" "}
                  All Patients
                </Typography>
              </div>
              <Typography
                variant="h3"
                style={{ textAlign: "center", color: "#fff" }}
              >
                {totalPatients}
              </Typography>
            </CardContent>
          </Card>
          <div style={{ marginBottom: "10px" }}></div>
          <TableContainer component={Paper} elevation={0}>
            <Table aria-label="customized table">
              <TableHead className={classes.head}>
                <TableRow>
                  <TableCell className={classes.text}>First Name</TableCell>
                  <TableCell className={classes.text}>Last Name</TableCell>
                  <TableCell className={classes.text}>Email</TableCell>
                  <TableCell className={classes.text}>Gender</TableCell>
                  <TableCell className={classes.text}>Username</TableCell>
                  <TableCell className={classes.text}>Phone Number</TableCell>
                  <TableCell className={classes.text}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patients.map((patient) => (
                  <TableRow>
                    <TableCell>{patient.firstName}</TableCell>
                    <TableCell>{patient.lastName}</TableCell>
                    <TableCell>{patient.email}</TableCell>
                    <TableCell>{patient.gender}</TableCell>
                    <TableCell>{patient.userName}</TableCell>
                    <TableCell>{patient.phoneNumber}</TableCell>
                    <TableCell>
                      <IconButton>
                        <ArrowForward />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  );
};

export default AllPatients;
