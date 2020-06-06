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
  MenuItem,
  Snackbar,
  Slide,
  LinearProgress,
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
  },
}));

const CreatePatient = () => {
  const classes = useStyles();
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
        firstName: "",
        lastName: "",
        gender: "",
        email: "",
        password: "",
        userName: "",
        phoneNumber: "",
        genotype: "",
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          console.log("Creating Patient", values);
          setLoading(true);
          axios
            .post(
              `https://polar-dusk-61658.herokuapp.com/providers/create_patient
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
        email: Yup.string().email("Invalid email").required("Required"),
        userName: Yup.string()
          .required("Required")
          .min(4, "The username can not be less than 4"),
        gender: Yup.string().required("Required"),
        password: Yup.string().required("No password provided").min(8),
        phoneNumber: Yup.string().required("Required"),
        genotype: Yup.string().required("Required"),
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
            <Typography variant="h4"> Create Patient</Typography>
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
                      name="password"
                      label="Password"
                      fullWidth
                      variant="outlined"
                      type="password"
                      error={err}
                      value={values.password || ""}
                      className={errors.password && touched.password && "error"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{ marginBottom: "20px" }}
                    />
                    {errors.password && touched.password && (
                      <div className={classes.error}> {errors.password} </div>
                    )}
                  </div>

                  <div>
                    <TextField
                      name="userName"
                      label="Username "
                      fullWidth
                      variant="outlined"
                      type="text"
                      error={err}
                      value={values.userName || ""}
                      className={errors.userName && touched.userName && "error"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{ marginBottom: "20px" }}
                    />
                    {errors.userName && touched.userName && (
                      <div className={classes.error}> {errors.userName} </div>
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

                  <div>
                    <TextField
                      name="genotype"
                      label="Genotype"
                      fullWidth
                      type="text"
                      variant="outlined"
                      error={err}
                      value={values.genotype || ""}
                      className={errors.genotype && touched.genotype && "error"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{ marginBottom: "20px", marginRight: "10px" }}
                    />
                    {errors.genotype && touched.genotype && (
                      <div className={classes.error}> {errors.genotype} </div>
                    )}
                  </div>

                  <Button
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    style={{ marginTop: "10px" }}
                    onClick={handleSubmit}
                  >
                    Create Patient
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

export default CreatePatient;
