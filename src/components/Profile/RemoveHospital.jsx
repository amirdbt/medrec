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

const RemoveHospital = ({ providername }) => {
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

  const removeHospital = () => {
    axios
      .patch(
        `https://polar-dusk-61658.herokuapp.com/users/remove_provider/${providername}`,
        "",
        {
          headers: { Authorization: `${token}` },
        }
      )
      .then((res) => {
        console.log(res);
        history.push("/hospitals");
      })
      .catch((err) => {
        console.log(err);
        setAl(true);
        setMessage("Hospital could not be removed");
        setSeverity("error");
      });
  };

  return (
    <div>
      <Tooltip title="Click to remove this hospital" arrow>
        <Button variant="contained" color="secondary" onClick={handleClickOpen}>
          <Delete style={{ marginRight: "5px" }} /> Remove Hospital
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
          {"Remove Hospital"}
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
          Are you sure you want to remove this hospital?
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={removeHospital}
            disabled={loading}
            color="secondary"
            autoFocus
            variant="contained"
          >
            Remove
          </Button>
          {loading && (
            <LinearProgress variant="query" style={{ marginTop: "10px" }} />
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RemoveHospital;
