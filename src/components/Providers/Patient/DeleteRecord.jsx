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

const DeleteRecord = ({ record_id, location }) => {
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

  const deleteRecord = () => {
    axios
      .delete(`https://polar-dusk-61658.herokuapp.com/records/${record_id}`, {
        headers: { Authorization: `${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setMessage("Record deleted successfully.");
        setAl(true);
        setTimeout(() => {
          history.push(`/all-patients/${location.state.username}`);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        setMessage("Record could not be deleted, Try again");
        setAl(true);
        setSeverity("error");
      });
  };
  return (
    <div>
      <Tooltip title="Click to delete this record" arrow>
        <Button variant="contained" color="secondary" onClick={handleClickOpen}>
          <Delete style={{ marginRight: "5px" }} /> Delete Record
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
          {"Delete Record"}
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
          Are you sure you want to delete this record?
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={deleteRecord}
            disabled={loading}
            color="secondary"
            autoFocus
            variant="contained"
          >
            Delete
          </Button>
          {loading && (
            <LinearProgress variant="query" style={{ marginTop: "10px" }} />
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteRecord;
