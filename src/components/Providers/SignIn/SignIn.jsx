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
  Grid,
  Container,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import { LocalHospital } from "@material-ui/icons";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: "rgb(235, 54, 54)",
  },
}));

const ProviderSiginIn = () => {
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  let history = useHistory();
  const classes = useStyles();

  return (
    <Formik
      initialValues={{ providerName: "", password: "" }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log("Logging in", values);
          setLoading(true);
          axios
            .post(`https://polar-dusk-61658.herokuapp.com/providers/login`, values)
            .then((res) => {
              console.log(res.data);
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("providerName", res.data.provider.providerName);
              localStorage.setItem("role", res.data.provider.role);
              setLoading(false);
              history.push("/", { user: res.data.provider });
            })
            .catch((err) => {
              console.log(err.response.data.error);
              setMessage(err.response.data.error);
              setLoading(false);
              setErr(true);
            });
          setSubmitting(false);
        }, 200);
      }}
      validationSchema={Yup.object().shape({
        providerName: Yup.string().required("Required"),
        password: Yup.string().required("No password provided").min(8),
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
            {err ? (
              <Alert style={{ marginTop: "20px" }} severity="error">
                {message}
              </Alert>
            ) : (
              <div></div>
            )}
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LocalHospital />
              </Avatar>

              <Typography component="h1" variant="h5">
                Welcome Back To MedRec
              </Typography>
              <Typography variant="subtitle1">
                Sign in to your account to continue
              </Typography>

              <form className={classes.form} onSubmit={handleSubmit}>
                <div className={classes.textfields}>
                  <TextField
                    name="providerName"
                    label="Provider Name *"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="text"
                    error={err}
                    value={values.providerName}
                    className={
                      errors.providerName &&
                      touched.providerName &&
                      "error"
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.providerName && touched.providerName && (
                    <div className={classes.error}>
                      {" "}
                      {errors.providerName}{" "}
                    </div>
                  )}
                  <div style={{ marginTop: "20px" }}></div>
                  <TextField
                    name="password"
                    label="Password *"
                    fullWidth
                    type="password"
                    variant="outlined"
                    error={err}
                    className={errors.password && touched.password && "error"}
                    // className={classes.text}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password && (
                    <div className={classes.error}> {errors.password} </div>
                  )}
                  <div style={{ marginTop: "10px" }}></div>

                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.submit}
                    disabled={loading}
                    onClick={handleSubmit}
                  >
                    Sign in
                  </Button>

                  {loading && (
                    <LinearProgress
                      variant="query"
                      style={{ marginTop: "10px" }}
                    />
                  )}

                  <div style={{ marginTop: "10px" }}></div>
                  <Grid container>
                    <Grid item xs>
                      <Link href="/forgotpassword" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="/user-component" variant="body2">
                        User? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </div>
              </form>
            </div>
          </Container>
        );
      }}
    </Formik>
  );
};
export default ProviderSiginIn;
