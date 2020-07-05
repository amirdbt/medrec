import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Typography,
  CircularProgress,
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
import EditProfile from "./EditProfile";
import axios from "axios";
import moment from "moment";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useHistory } from "react-router-dom";

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

const Profile = ({ match }) => {
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  let token = localStorage.getItem("token");

  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = () => {
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
        setLoading(false);
        setErr(true);
      });
  };

  let history = useHistory();

  const deactivateAccount = () => {
    setTimeout(() => {
      console.log("Deactivating account");
      setLoading(true);
      axios
        .delete(`https://polar-dusk-61658.herokuapp.com/users/deactivate`, {
          headers: { Authorization: `${token}` },
        })
        .then((res) => {
          console.log(res);
          localStorage.removeItem("token");
          localStorage.removeItem("firstName");
          localStorage.removeItem("lastName");
          localStorage.removeItem("email");
          localStorage.removeItem("userName");
          localStorage.removeItem("_id");
          history.push("/user-component");
        })
        .catch((error) => {
          console.log(error);
        });
    }, 200);
  };

  return (
    <div className="content">
      {loading ? (
        <CircularProgress style={{ marginLeft: "50%" }} />
      ) : (
        <>
          <div style={{ marginTop: "20px" }}></div>
          {err && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              There is an error with the server. Please refresh the page.
            </Alert>
          )}
          <div style={{ marginBottom: "10px" }}></div>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TableContainer component={Paper} elevation={0}>
                <Table aria-label="customized table">
                  <TableHead className={classes.head}>
                    <TableRow>
                      <TableCell className={classes.text}>First Name</TableCell>
                      <TableCell>{user.firstName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.text}>Last Name</TableCell>
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
                      <TableCell className={classes.text}>User Name</TableCell>
                      <TableCell>{user.userName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.text}>
                        Phone Number
                      </TableCell>
                      <TableCell>{user.phoneNumber}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.text}>
                        NHIS Number
                      </TableCell>
                      <TableCell>{user.nhis_number}</TableCell>
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
                      <TableCell>
                        {moment(user.dob).format("DD MMM, YYYY")}
                      </TableCell>
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
            <Grid item xs={12} sm={12}>
              <Card elevation={0}>
                <CardContent>
                  <Typography>Other Actions</Typography>
                  <hr />

                  <div style={{ marginBottom: "20px" }}></div>
                  <Grid container spacing={3}>
                    <Grid item>
                      <EditProfile user={user} />
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="secondary"
                        color="secondary"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to deactivate your account?"
                            )
                          )
                            deactivateAccount();
                        }}
                      >
                        <Delete style={{ marginRight: "5px" }} /> Deactivate
                        Account
                      </Button>
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

export default Profile;
