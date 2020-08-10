import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
  makeStyles,
  LinearProgress,
  Snackbar,
  Slide,
  Grid,
  TextField,
  Tooltip,
} from "@material-ui/core";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Create } from "@material-ui/icons";

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

const EditProfile = ({ hospital, fetchHospital }) => {
  console.log(hospital);
  const [open, setOpen] = useState(false);
  const [al, setAl] = useState(false);
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [severity, setSeverity] = useState("success");
  const theme = useTheme();
  const token = localStorage.getItem("token");

  const { address, email, state, phone_number_main } = hospital;

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
      enableReinitialize={true}
      initialValues={{
        address,
        email,
        state,
        phone_number_main,
        phone_number_two: "",
        phone_number_three: "",
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          console.log("Editing profile", values);
          setLoading(true);
          axios
            .patch(
              `https://polar-dusk-61658.herokuapp.com/providers/edit
          `,
              values,
              { headers: { Authorization: `${token}` } }
            )
            .then((res) => {
              console.log(res);
              console.log(res.data.message);
              setMessage(res.data.message);
              setAl(true);
              setLoading(false);
              resetForm({});
              fetchHospital();
            })
            .catch((err) => {
              console.log(err.response.data.error);
              setMessage(err.response.data.error);
              setErr(true);
              setAl(true);
              setSeverity("error");
              setLoading(false);
            });
          setSubmitting(false);
        }, 200);
      }}
      validationSchema={Yup.object().shape({
        address: Yup.string().min(2, "The address can not be less than 2"),

        email: Yup.string().email("Invalid email"),
        state: Yup.string(),
        phone_number_main: Yup.string(),
        phone_number_two: Yup.string(),
        phone_number_three: Yup.string(),
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
            <Tooltip title="Click to edit profile" arrow>
              <Button
                variant="contained"
                color="primary"
                onClick={handleClickOpen}
              >
                <Create style={{ marginRight: "5px" }} /> Edit Profile
              </Button>
            </Tooltip>
            <Dialog
              fullScreen={fullScreen}
              open={open}
              maxWidth="md"
              onClose={handleClose}
              fullWidth
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">
                {"Edit Profile"}
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
                  <Grid item xs={12}>
                    <div>
                      <TextField
                        name="address"
                        label="Address"
                        multiline
                        variant="outlined"
                        fullWidth
                        type="text"
                        error={err}
                        value={values.address || ""}
                        className={errors.address && touched.address && "error"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ marginBottom: "20px", marginRight: "10px" }}
                      />

                      {errors.address && touched.address && (
                        <div className={classes.error}> {errors.address} </div>
                      )}
                    </div>
                    <div>
                      <TextField
                        name="email"
                        label="Email Address"
                        fullWidth
                        variant="outlined"
                        type="email"
                        error={err}
                        value={values.email || ""}
                        className={errors.email && touched.email && "error"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ marginBottom: "20px" }}
                      />
                      {errors.email && touched.email && (
                        <div className={classes.error}> {errors.email} </div>
                      )}
                    </div>
                    <div>
                      <TextField
                        name="state"
                        label="State"
                        variant="outlined"
                        fullWidth
                        type="text"
                        error={err}
                        value={values.state || ""}
                        className={errors.state && touched.state && "error"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ marginBottom: "20px" }}
                      />
                      {errors.state && touched.state && (
                        <div className={classes.error}> {errors.state} </div>
                      )}
                    </div>

                    <div>
                      <TextField
                        name="phone_number_main"
                        label="Phone Number 1"
                        fullWidth
                        variant="outlined"
                        type="text"
                        error={err}
                        value={values.phone_number_main || ""}
                        className={
                          errors.phone_number_main &&
                          touched.phone_number_main &&
                          "error"
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ marginBottom: "20px" }}
                      />
                      {errors.phone_number_main &&
                        touched.phone_number_main && (
                          <div className={classes.error}>
                            {" "}
                            {errors.phone_number_main}{" "}
                          </div>
                        )}
                    </div>

                    <div>
                      <TextField
                        name="phone_number_two"
                        label="Phone Number 2 "
                        fullWidth
                        variant="outlined"
                        type="text"
                        error={err}
                        value={values.phone_number_two || ""}
                        className={
                          errors.phone_number_two &&
                          touched.phone_number_two &&
                          "error"
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ marginBottom: "20px" }}
                      />
                      {errors.phone_number_two && touched.phone_number_two && (
                        <div className={classes.error}>
                          {" "}
                          {errors.phone_number_two}{" "}
                        </div>
                      )}
                    </div>
                    <div>
                      <TextField
                        name="phone_number_three"
                        label="Phone Number 3"
                        fullWidth
                        type="text"
                        variant="outlined"
                        error={err}
                        value={values.phone_number_three || ""}
                        className={
                          errors.phone_number_three &&
                          touched.phone_number_three &&
                          "error"
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ marginBottom: "20px" }}
                      />
                      {errors.phone_number_three &&
                        touched.phone_number_three && (
                          <div className={classes.error}>
                            {errors.phone_number_three}
                          </div>
                        )}
                    </div>
                  </Grid>
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

export default EditProfile;
