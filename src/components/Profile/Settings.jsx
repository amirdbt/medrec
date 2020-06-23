import React, { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  TextField,
  makeStyles,
  Button,
  Select,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Snackbar,
  Slide,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "flex",
    justifyContent: "space-between",
  },
  error: {
    color: "rgb(235, 54, 54)",
    marginTop: "-20px",
    marginBottom: "20px",
  },
}));

const Settings = () => {
  const classes = useStyles();
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const email = localStorage.getItem("email");
  const phoneNumber = localStorage.getItem("phoneNumber");
  const gender = localStorage.getItem("gender");
  const userName = localStorage.getItem("userName");
  const [err, setErr] = useState(false);
  const [al, setAl] = useState(false);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [open, setOpen] = useState(true);
  const token = localStorage.getItem("token");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Formik
      initialValues={{
        firstName,
        lastName,
        gender,
        email,
        dob: "",
        genotype: "",
        bloodGroup: "",
        phoneNumber,
        nextOfKin: "",
        nationality: "",
        stateOfOrigin: "",
        nextOfKin_contact: "",
        nhis_number: "",
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          console.log("Editing profile", values);
          setLoading(true);
          axios
            .patch(
              `https://polar-dusk-61658.herokuapp.com/users/edit
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
        firstName: Yup.string()
          .required("Required")
          .min(2, "The first name can not be less than 2"),
        lastName: Yup.string()
          .required("Required")
          .min(2, "The last name can not be less than 2"),
        gender: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email").required("Required"),
        dob: Yup.date().required("Required"),
        genotype: Yup.string(),
        bloodGroup: Yup.string(),
        phoneNumber: Yup.string().required("Required"),
        nextOfKin: Yup.string(),
        nationality: Yup.string(),
        stateOfOrigin: Yup.string(),
        nextOfKin_contact: Yup.string(),
        nhis_number: Yup.string(),
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
          <div className="content">
            {al ? (
              <>
                <Alert severity={severity}>
                  <AlertTitle>{severity}</AlertTitle>
                  {message}
                </Alert>
                <Snackbar
                  open={open}
                  autoHideDuration={3000}
                  TransitionComponent={Slide}
                  onClose={handleClose}
                >
                  <Alert severity={severity}>{message}</Alert>
                </Snackbar>
              </>
            ) : (
              <div></div>
            )}
            <Typography variant="h6" style={{ fontStyle: "italic" }}>
              {" "}
              {userName}
            </Typography>
            <Typography variant="h5">Edit your profile</Typography>
            <Card elevation={0}>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div>
                    <TextField
                      name="firstName"
                      label="First name"
                      variant="outlined"
                      fullWidth
                      type="text"
                      error={err}
                      value={values.firstName || ""}
                      className={
                        errors.firstName && touched.firstName && "error"
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{ marginBottom: "20px", marginRight: "10px" }}
                    />

                    {errors.firstName && touched.firstName && (
                      <div className={classes.error}> {errors.firstName} </div>
                    )}
                  </div>
                  <div>
                    <TextField
                      name="lastName"
                      label="Last name"
                      variant="outlined"
                      fullWidth
                      type="text"
                      error={err}
                      value={values.lastName || ""}
                      className={errors.lastName && touched.lastName && "error"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{ marginBottom: "20px" }}
                    />
                    {errors.lastName && touched.lastName && (
                      <div className={classes.error}> {errors.lastName} </div>
                    )}
                  </div>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    style={{ marginBottom: "20px", marginRight: "10px" }}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Gender
                    </InputLabel>
                    <Select
                      label="Gender"
                      name="gender"
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      fullWidth
                      value={values.gender || ""}
                      onChange={handleChange}
                      error={err}
                      onBlur={handleBlur}
                      className={errors.gender && touched.gender && "error"}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                    </Select>
                    {errors.gender && touched.gender && (
                      <div className={classes.error}> {errors.gender} </div>
                    )}
                  </FormControl>
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
                      label="Date of birth"
                      placeholder="Date of birth"
                      variant="outlined"
                      type="date"
                      fullWidth
                      name="dob"
                      error={err}
                      value={values.dob || ""}
                      className={errors.dob && touched.dob && "error"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      style={{ marginBottom: "20px" }}
                    />
                    {errors.dob && touched.dob && (
                      <div className={classes.error}> {errors.dob} </div>
                    )}
                  </div>
                  <div>
                    <TextField
                      name="phoneNumber"
                      label="Phone Number"
                      fullWidth
                      type="text"
                      variant="outlined"
                      error={err}
                      value={values.phoneNumber || ""}
                      className={
                        errors.phoneNumber && touched.phoneNumber && "error"
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{ marginBottom: "20px" }}
                    />
                    {errors.phoneNumber && touched.phoneNumber && (
                      <div className={classes.error}>{errors.phoneNumber}</div>
                    )}
                  </div>

                  <div className={classes.input}>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      style={{ marginBottom: "20px", marginRight: "10px" }}
                    >
                      <InputLabel id="demo-simple-select-outlined-label">
                        Blood Group
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        fullWidth
                        label="Blood Group"
                        name="bloodGroup"
                        error={err}
                        value={values.bloodGroup || "null"}
                        className={
                          errors.bloodGroup && touched.bloodGroup && "error"
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="A+">A+</MenuItem>
                        <MenuItem value="A-">A-</MenuItem>
                        <MenuItem value="B+">B+</MenuItem>
                        <MenuItem value="B-">B-</MenuItem>
                        <MenuItem value="O+">O+</MenuItem>
                        <MenuItem value="O-">O-</MenuItem>
                        <MenuItem value="AB+">AB+</MenuItem>
                        <MenuItem value="AB-">AB-</MenuItem>
                      </Select>
                    </FormControl>
                    {errors.bloodGroup && touched.bloodGroup && (
                      <div className={classes.error}> {errors.bloodGroup} </div>
                    )}
                    <TextField
                      name="genotype"
                      label="Genotype"
                      fullWidth
                      type="text"
                      variant="outlined"
                      error={err}
                      value={values.genotype || "null"}
                      className={errors.genotype && touched.genotype && "error"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{ marginBottom: "20px" }}
                    />
                    {errors.genotype && touched.genotype && (
                      <div className={classes.error}> {errors.genotype} </div>
                    )}
                  </div>
                  <div className={classes.input}>
                    <TextField
                      name="nextOfKin"
                      label="Next of kin"
                      placeholder="Next of kin"
                      variant="outlined"
                      fullWidth
                      error={err}
                      value={values.nextOfKin || "null"}
                      className={
                        errors.nextOfKin && touched.nextOfKin && "error"
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{ marginBottom: "20px", marginRight: "10px" }}
                    />
                    {errors.nextOfKin && touched.nextOfKin && (
                      <div className={classes.error}> {errors.nextOfKin} </div>
                    )}
                    <TextField
                      name="nationality"
                      label="Nationality"
                      placeholder="Nationality"
                      variant="outlined"
                      fullWidth
                      error={err}
                      value={values.nationality || "null"}
                      className={
                        errors.nationality && touched.nationality && "error"
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{ marginBottom: "20px" }}
                    />
                    {errors.nationality && touched.nationality && (
                      <div className={classes.error}>
                        {" "}
                        {errors.nationality}{" "}
                      </div>
                    )}
                  </div>
                  <div className={classes.input}>
                    <TextField
                      name="stateOfOrigin"
                      label="State of origin"
                      placeholder="State of origin"
                      variant="outlined"
                      fullWidth
                      error={err}
                      value={values.stateOfOrigin || "null"}
                      className={
                        errors.stateOfOrigin && touched.stateOfOrigin && "error"
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{ marginBottom: "20px", marginRight: "10px" }}
                    />
                    {errors.stateOfOrigin && touched.stateOfOrigin && (
                      <div className={classes.error}>
                        {" "}
                        {errors.stateOfOrigin}{" "}
                      </div>
                    )}
                    <TextField
                      name="nextOfKin_contact"
                      label="Next of kin contact"
                      placeholder="Next of kin contact"
                      variant="outlined"
                      fullWidth
                      error={err}
                      value={values.nextOfKin_contact || "null"}
                      className={
                        errors.nextOfKin_contact &&
                        touched.nextOfKin_contact &&
                        "error"
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{ marginBottom: "20px" }}
                    />
                    {errors.nextOfKin_contact && touched.nextOfKin_contact && (
                      <div className={classes.error}>
                        {" "}
                        {errors.nextOfKin_contact}{" "}
                      </div>
                    )}
                  </div>
                  <div>
                    <TextField
                      name="nhis_number"
                      label="NHIS Number"
                      variant="outlined"
                      fullWidth
                      type="text"
                      error={err}
                      value={values.nhis_number || "null"}
                      className={
                        errors.nhis_number && touched.nhis_number && "error"
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{ marginBottom: "20px", marginRight: "10px" }}
                    />

                    {errors.nhis_number && touched.nhis_number && (
                      <div className={classes.error}>
                        {" "}
                        {errors.nhis_number}{" "}
                      </div>
                    )}
                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    style={{ marginTop: "10px" }}
                    onClick={handleSubmit}
                  >
                    Save Changes
                  </Button>
                  {loading && (
                    <LinearProgress
                      variant="query"
                      style={{ marginTop: "10px" }}
                    />
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        );
      }}
    </Formik>
  );
};

export default Settings;
