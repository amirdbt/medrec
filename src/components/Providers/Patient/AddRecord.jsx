import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  TextField,
  useTheme,
  makeStyles,
  LinearProgress,
  Snackbar,
  Slide,
} from "@material-ui/core";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import { Alert, AlertTitle } from "@material-ui/lab";
import { AddCircleOutline } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  dialog: {
    width: "100%",
  },
  error: {
    color: "rgb(235, 54, 54)",
    marginTop: "-20px",
    marginBottom: "10px",
  },
}));

const AddRecord = ({ user_id, fetchRecords }) => {
  const [open, setOpen] = useState(false);
  const [al, setAl] = useState(false);
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [severity, setSeverity] = useState("success");
  const theme = useTheme();
  const token = localStorage.getItem("token");
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Formik
      initialValues={{
        record_name: "",
        user_id,
        ailments: "",
        comment: "",
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          console.log("Creating Records", values);
          setLoading(true);
          axios
            .post(
              `https://polar-dusk-61658.herokuapp.com/records/upload
            `,
              values,
              { headers: { Authorization: `${token}` } }
            )
            .then((res) => {
              console.log(res);
              console.log(res.data.message);
              setMessage("Record created successfully");
              setAl(true);
              setLoading(false);
              resetForm({});
              fetchRecords();
            })
            .catch((err) => {
              console.log(err.response.data.error);
              setMessage("Record could not be created, try again");
              setErr(true);
              setAl(true);
              setSeverity("error");
              setLoading(false);
              // setTimeout(() => {
              //   window.location.reload(false);
              // }, 700);
            });
          setSubmitting(false);
        }, 200);
      }}
      validationSchema={Yup.object().shape({
        record_name: Yup.string().required("Required"),
        ailments: Yup.string().required("Required"),
        comment: Yup.string().required("Required"),
      })}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <div>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleClickOpen}
            >
              <AddCircleOutline style={{ marginRight: "5px" }} />
              ADD NEW RECORD
            </Button>
            <Dialog
              fullScreen={fullScreen}
              open={open}
              onClose={handleClose}
              fullWidth
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">
                {"Add New A Record"}
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
              <form onSubmit={handleSubmit}>
                <DialogContent>
                  <div>
                    <TextField
                      name="record_name"
                      label="Record Name"
                      variant="outlined"
                      fullWidth
                      type="text"
                      error={err}
                      value={values.record_name || ""}
                      className={
                        errors.record_name && touched.record_name && "error"
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{ marginBottom: "20px", marginRight: "10px" }}
                    />

                    {errors.record_name && touched.record_name && (
                      <div className={classes.error}>
                        {" "}
                        {errors.record_name}{" "}
                      </div>
                    )}
                  </div>

                  <div>
                    <TextField
                      name="ailments"
                      label="Ailments"
                      variant="outlined"
                      fullWidth
                      type="text"
                      error={err}
                      value={values.ailments || ""}
                      className={errors.ailments && touched.ailments && "error"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{ marginBottom: "20px", marginRight: "10px" }}
                    />

                    {errors.ailments && touched.ailments && (
                      <div className={classes.error}> {errors.ailments} </div>
                    )}
                  </div>
                  <div>
                    <TextField
                      name="comment"
                      label="Comment"
                      variant="outlined"
                      fullWidth
                      type="text"
                      error={err}
                      value={values.comment || ""}
                      className={errors.comment && touched.comment && "error"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{ marginBottom: "20px", marginRight: "10px" }}
                    />

                    {errors.comment && touched.comment && (
                      <div className={classes.error}> {errors.comment} </div>
                    )}
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button autoFocus onClick={handleClose} color="secondary">
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    color="primary"
                    autoFocus
                  >
                    Submit
                  </Button>
                  {loading && (
                    <LinearProgress
                      variant="query"
                      style={{ marginTop: "10px" }}
                    />
                  )}
                </DialogActions>
              </form>
            </Dialog>
          </div>
        );
      }}
    </Formik>
  );
};

export default AddRecord;
