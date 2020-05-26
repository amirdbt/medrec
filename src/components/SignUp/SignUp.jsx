import React, { useState } from "react";
import {
  Button,
  Typography,
  TextField,
  Link,
  LinearProgress,
  makeStyles,
  Avatar,
  CssBaseline,
  Container,
  Grid,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { LockOutlined } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: "rgb(235, 54, 54)",
  },
}));

const SignUp = () => {
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  let history = useHistory();
  const classes = useStyles();

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
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log("Signing up", values);
          setLoading(true);
          axios
            .post(`https://polar-dusk-61658.herokuapp.com/users/signup`, values)
            .then((res) => {
              console.log(res);
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("firstName", res.data.user.firstName);
              localStorage.setItem("lastName", res.data.user.lastName);
              localStorage.setItem("email", res.data.user.email);
              localStorage.setItem("userName", res.data.user.userName);
              localStorage.setItem("_id", res.data.user._id);
              setLoading(false);
              history.push("/settings");
            })
            .catch((err) => {
              console.log(err.response.data.error);
              setMessage(err.response.data.error);
              setErr(true);
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
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            {err ? <Alert severity="error">{message}</Alert> : <div></div>}
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlined />
              </Avatar>

              <div className={classes.display}>
                <Typography component="h1" variant="h5">
                  Welcome To MedRec
                </Typography>
                <Typography component="h4" variant="subtitle1">
                  Sign up
                </Typography>
              </div>

              <form onSubmit={handleSubmit} className={classes.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="firstName"
                      label="Firstname *"
                      fullWidth
                      variant="outlined"
                      type="text"
                      error={err}
                      value={values.firstName}
                      className={
                        errors.firstName && touched.firstName && "error"
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.firstName && touched.firstName && (
                      <div className={classes.error}> {errors.firstName} </div>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="lastName"
                      label="Lastname *"
                      fullWidth
                      variant="outlined"
                      type="text"
                      error={err}
                      value={values.lastName}
                      className={errors.lastName && touched.lastName && "error"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.lastName && touched.lastName && (
                      <div className={classes.error}> {errors.lastName} </div>
                    )}
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      name="email"
                      label="Email Address *"
                      fullWidth
                      variant="outlined"
                      type="email"
                      error={err}
                      value={values.email}
                      className={errors.email && touched.email && "error"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.email && touched.email && (
                      <div className={classes.error}> {errors.email} </div>
                    )}
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      name="userName"
                      label="Username *"
                      fullWidth
                      variant="outlined"
                      type="text"
                      error={err}
                      value={values.userName}
                      className={errors.userName && touched.userName && "error"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.userName && touched.userName && (
                      <div className={classes.error}> {errors.userName} </div>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="demo-simple-select-outlined-label">
                        Gender
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={values.gender}
                        onChange={handleChange}
                        error={err}
                        onBlur={handleBlur}
                        className={errors.gender && touched.gender && "error"}
                        label="Gender"
                        name="gender"
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
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="phoneNumber"
                      label="Phone Number *"
                      fullWidth
                      type="text"
                      variant="outlined"
                      error={err}
                      value={values.phoneNumber}
                      className={
                        errors.phoneNumber && touched.phoneNumber && "error"
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.phoneNumber && touched.phoneNumber && (
                      <div className={classes.error}>{errors.phoneNumber}</div>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="password"
                      label="Password *"
                      fullWidth
                      type="password"
                      variant="outlined"
                      error={err}
                      className={errors.password && touched.password && "error"}
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.password && touched.password && (
                      <div className={classes.error}> {errors.password} </div>
                    )}
                  </Grid>
                </Grid>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  className={classes.submit}
                  onClick={handleSubmit}
                >
                  Sign Up
                </Button>
                {loading && (
                  <LinearProgress
                    variant="query"
                    style={{ marginTop: "10px" }}
                  />
                )}
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link href="/signin" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
        );
      }}
    </Formik>
  );
};
export default SignUp;
