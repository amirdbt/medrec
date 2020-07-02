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
  Tooltip,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { LocalHospital } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import HelpInfo from "./Help";

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

const ProviderSignUp = () => {
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  let history = useHistory();
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        providerName: "",
        address: "",
        state: "",
        email: "",
        password: "",
        phone_number_main: "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log("Signing up", values);
          setLoading(true);
          axios
            .post(
              `https://polar-dusk-61658.herokuapp.com/providers/signUp`,
              values
            )
            .then((res) => {
              console.log(res);
              localStorage.setItem("token", res.data.token);
              localStorage.setItem(
                "providerName",
                res.data.provider.providerName
              );
              localStorage.setItem("role", res.data.provider.role);
              localStorage.setItem("activate", res.data.provider.activate);
              setLoading(false);
              history.push("/");
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
        providerName: Yup.string().required("Required"),
        address: Yup.string().required("Required"),
        state: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email").required("Required"),
        phone_number_main: Yup.string().required("Required"),
        password: Yup.string()
          .required("No password provided")
          .min(8)
          .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            "Password must contain at least 8 characters, one uppercase, one number and one special case character"
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
            {err ? <Alert severity="error">{message}</Alert> : <div></div>}
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LocalHospital />
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
                  <Grid item xs={12}>
                    <TextField
                      name="providerName"
                      label="Provider Name *"
                      fullWidth
                      variant="outlined"
                      type="text"
                      error={err}
                      value={values.providerName}
                      className={
                        errors.providerName && touched.providerName && "error"
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
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="address"
                      label="Address *"
                      fullWidth
                      variant="outlined"
                      type="text"
                      multiline
                      error={err}
                      value={values.address}
                      className={errors.address && touched.address && "error"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.address && touched.address && (
                      <div className={classes.error}> {errors.address} </div>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="demo-simple-select-outlined-label">
                        State
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        fullWidth
                        label="state"
                        name="state"
                        error={err}
                        value={values.state || ""}
                        className={errors.state && touched.state && "error"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="Abuja FCT">Abuja FCT</MenuItem>
                        <MenuItem value="Abia">Abia</MenuItem>
                        <MenuItem value="Adamawa">Adamawa</MenuItem>
                        <MenuItem value="Akwa Ibom">Akwa Ibom</MenuItem>
                        <MenuItem value="Anambra">Anambra</MenuItem>
                        <MenuItem value="Bauchi">Bauchi</MenuItem>
                        <MenuItem value="Bayelsa">Bayelsa</MenuItem>
                        <MenuItem value="Benue">Benue</MenuItem>
                        <MenuItem value="Borno">Borno</MenuItem>
                        <MenuItem value="Cross River">Cross River</MenuItem>
                        <MenuItem value="Delta">Delta</MenuItem>
                        <MenuItem value="Ebonyi">Ebonyi</MenuItem>
                        <MenuItem value="Edo">Edo</MenuItem>
                        <MenuItem value="Ekiti">Ekiti</MenuItem>
                        <MenuItem value="Enugu">Enugu</MenuItem>
                        <MenuItem value="Gombe">Gombe</MenuItem>
                        <MenuItem value="Imo">Imo</MenuItem>
                        <MenuItem value="Jigawa">Jigawa</MenuItem>
                        <MenuItem value="Kaduna">Kaduna</MenuItem>
                        <MenuItem value="Kano">Kano</MenuItem>
                        <MenuItem value="Katsina">Katsina</MenuItem>
                        <MenuItem value="Kebbi">Kebbi</MenuItem>
                        <MenuItem value="Kogi">Kogi</MenuItem>
                        <MenuItem value="Kwara">Kwara</MenuItem>
                        <MenuItem value="Lagos">Lagos</MenuItem>
                        <MenuItem value="Nassarawa">Nassarawa</MenuItem>
                        <MenuItem value="Niger">Niger</MenuItem>
                        <MenuItem value="Ogun">Ogun</MenuItem>
                        <MenuItem value="Ondo">Ondo</MenuItem>
                        <MenuItem value="Osun">Osun</MenuItem>
                        <MenuItem value="Oyo">Oyo</MenuItem>
                        <MenuItem value="Plateau">Plateau</MenuItem>
                        <MenuItem value="Rivers">Rivers</MenuItem>
                        <MenuItem value="Sokoto">Sokoto</MenuItem>
                        <MenuItem value="Taraba">Taraba</MenuItem>
                        <MenuItem value="Yobe">Yobe</MenuItem>
                        <MenuItem value="Zamfara">Zamfara</MenuItem>
                      </Select>
                    </FormControl>
                    {errors.state && touched.state && (
                      <div className={classes.error}> {errors.state} </div>
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
                      name="phone_number_main"
                      label="Phone Number *"
                      fullWidth
                      type="text"
                      variant="outlined"
                      error={err}
                      value={values.phone_number_main}
                      className={
                        errors.phone_number_main &&
                        touched.phone_number_main &&
                        "error"
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.phone_number_main && touched.phone_number_main && (
                      <div className={classes.error}>
                        {errors.phone_number_main}
                      </div>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <Tooltip
                      title="Password must contain at least 8 characters, one uppercase, one number and one special character, e.g Realmadrid1%"
                      arrow
                    >
                      <TextField
                        name="password"
                        label="Password *"
                        fullWidth
                        type="password"
                        variant="outlined"
                        error={err}
                        className={
                          errors.password && touched.password && "error"
                        }
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Tooltip>
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
                <Grid container>
                  <Grid item xs>
                    <Link href="/user-component" variant="body2">
                      User? Sign up
                    </Link>
                  </Grid>
                  <Grid item xs>
                    <HelpInfo />
                  </Grid>
                </Grid>
                <div style={{ marginBottom: "20px" }}></div>
              </form>
            </div>
          </Container>
        );
      }}
    </Formik>
  );
};
export default ProviderSignUp;
