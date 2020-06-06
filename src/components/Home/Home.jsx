import React from "react";
import { Snackbar, Slide, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const Home = () => {
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const providerName = localStorage.getItem("providerName");

  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <div className="content">
      <Typography variant="h5">
        Welcome {firstName} {lastName}
      </Typography>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        TransitionComponent={Slide}
        onClose={handleClose}
      >
        {providerName ? (
          <Alert onClose={handleClose} severity="success">
            Welcome {providerName}
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="success">
            Welcome {firstName} {lastName}
          </Alert>
        )}
      </Snackbar>
    </div>
  );
};

export default Home;
