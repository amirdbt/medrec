import React from "react";
import {
  Snackbar,
  Slide,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const Home = () => {
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const providerName = localStorage.getItem("providerName");
  const role = localStorage.getItem("role");

  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <div className="content">
      {role === "provider" ? (
        <Typography variant="h5">Here's what's happening.</Typography>
      ) : (
        <Typography variant="h5">
          Welcome {firstName} {lastName}
        </Typography>
      )}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        TransitionComponent={Slide}
        onClose={handleClose}
      >
        {role === "provider" ? (
          <Alert onClose={handleClose} severity="success">
            Welcome {providerName}
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="success">
            Welcome {firstName} {lastName}
          </Alert>
        )}
      </Snackbar>
      <div style={{ marginBottom: "20px" }}></div>
      {role === "provider" && (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Card elevation={0}>
              <CardContent>
                <Typography> Total Patients</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card elevation={0}>
              <CardContent>
                <Typography>Total Records</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card elevation={0}>
              <CardContent>
                <Typography>Total Shared Records</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Home;
