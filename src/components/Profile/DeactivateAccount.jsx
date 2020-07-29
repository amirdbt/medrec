import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
  LinearProgress,
  Snackbar,
  Slide,
  Tooltip,
} from "@material-ui/core";
import axios from "axios";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Delete } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const DeactivateAccount = () => {
  const [open, setOpen] = useState(false);
  const [al, setAl] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [severity, setSeverity] = useState("success");
  const theme = useTheme();
  const token = localStorage.getItem("token");

  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          history.push("/users");
        })
        .catch((error) => {
          console.log(error);
          setAl(true);
          setMessage("Account could not be deactivated");
          setSeverity("error");
        });
    }, 200);
  };

  return (
    <div>
      <Tooltip title="Click to deactivate account" arrow>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClickOpen}
          style={{ marginLeft: 10 }}
        >
          <Delete style={{ marginRight: "5px" }} /> Deactivate Account
        </Button>
      </Tooltip>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        maxWidth="sm"
        onClose={handleClose}
        fullWidth
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Deactivate Account"}
        </DialogTitle>
        {al ? (
          <>
            <Alert severity={severity}>
              <AlertTitle>{severity}</AlertTitle>
              {message}
            </Alert>
            <Snackbar
              open={open}
              // autoHideDuration={3000}
              TransitionComponent={Slide}
              onClose={handleClose}
            >
              <Alert severity={severity}>{message}</Alert>
            </Snackbar>
          </>
        ) : (
          <div></div>
        )}

        <DialogContent>
          Are you sure you want to deactivate your account?
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={deactivateAccount}
            disabled={loading}
            color="secondary"
            autoFocus
            variant="contained"
          >
            Deactivate
          </Button>
          {loading && (
            <LinearProgress variant="query" style={{ marginTop: "10px" }} />
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeactivateAccount;
