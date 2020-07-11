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
  InputAdornment,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Collapse,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";

import { useHistory } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import { Person, Visibility, VisibilityOff } from "@material-ui/icons";
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
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

const SiginIn = () => {
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  let history = useHistory();
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Formik
      initialValues={{ userNameOrEmail: "", password: "" }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log("Logging in", values);
          setLoading(true);
          axios
            .post(`https://polar-dusk-61658.herokuapp.com/users/login`, values)
            .then((res) => {
              console.log(res.data);
              setLoading(false);
              history.push("/otp-verification", {
                userName: res.data.userName,
              });
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
        userNameOrEmail: Yup.string().required("Required"),
        password: Yup.string()
          .required("No password provided")
          .min(8)
          .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            "Password must contain at least 8 characters,one lowercase, one uppercase, one number and one special case character"
          ),
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
                <Person />
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
                    name="userNameOrEmail"
                    label="Username or Email*"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="text"
                    error={err}
                    value={values.userNameOrEmail}
                    className={
                      errors.userNameOrEmail &&
                      touched.userNameOrEmail &&
                      "error"
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.userNameOrEmail && touched.userNameOrEmail && (
                    <div className={classes.error}>
                      {" "}
                      {errors.userNameOrEmail}{" "}
                    </div>
                  )}
                  <div style={{ marginTop: "20px" }}></div>
                  <TextField
                    name="password"
                    label="Password *"
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    error={err}
                    className={errors.password && touched.password && "error"}
                    // className={classes.text}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputProps={{
                      // <-- This is where the toggle button is added.
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
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
                      <Link href="/provider-component" variant="body2">
                        Provider? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                  <div style={{ marginTop: "10px" }}></div>
                  <Card elevation={0}>
                    <CardActions disableSpacing>
                      <Typography variant="body1">Contact Us</Typography>
                      <IconButton
                        className={clsx(classes.expand, {
                          [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </IconButton>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                      <CardContent>
                        <Typography paragraph>
                          Best Team In The World
                        </Typography>
                        <Typography paragraph>Real Madrid</Typography>
                      </CardContent>
                    </Collapse>
                  </Card>
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
