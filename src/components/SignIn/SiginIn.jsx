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
import { Alert } from "@material-ui/lab";
import { LockOutlined } from "@material-ui/icons";
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

const SiginIn = () => {
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState("");

  const classes = useStyles();

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log("Logging in", values);
          axios
            .post(``, values)
            .then((res) => {})
            .catch((err) => {
              console.log(err);
              setErr(true);
              setMessage(err);
            });
          setSubmitting(false);
        }, 500);
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().required("Required"),
        password: Yup.string().required("No password provided").min(8),
      })}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
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

              <Typography component="h1" variant="h5">
                Welcome Back To MedRec
              </Typography>
              <Typography variant="subtitle1">
                Sign in to your account to continue
              </Typography>

              <form className={classes.form} onSubmit={handleSubmit}>
                <div className={classes.textfields}>
                  <TextField
                    name="username"
                    label="Username *"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="text"
                    error={err}
                    value={values.username}
                    className={errors.username && touched.username && "error"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.username && touched.username && (
                    <div className={classes.error}> {errors.username} </div>
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
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                  >
                    Sign in
                  </Button>

                  {isSubmitting && (
                    <LinearProgress
                      variant="query"
                      style={{ marginTop: "10px" }}
                    />
                  )}

                  <div style={{ marginTop: "10px" }}></div>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="/signup" variant="body2">
                        {"Don't have an account? Sign Up"}
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
export default SiginIn;
