import React, { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Button,
  LinearProgress,
  makeStyles,
  TextField,
  Snackbar,
  Slide,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";

const useStyles = makeStyles((theme) => ({
  error: {
    color: "rgb(235, 54, 54)",
    marginTop: "-20px",
    marginBottom: "20px",
  },
}));

const AddPatient = () => {
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
        MRID: "",
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          console.log("Creating Records", values);
          setLoading(true);
          axios
            .post(
              `https://polar-dusk-61658.herokuapp.com/providers/add_patient/new`,
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
        MRID: Yup.string().required("Required"),
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
            <Typography
              variant="h4"
              style={{ marginBottom: "10px", textAlign: "center" }}
            >
              {" "}
              Add Patient
            </Typography>
            <Typography
              variant="body2"
              style={{ marginBottom: "10px", textAlign: "center" }}
            >
              Enter Patient's MRID to add to Hospital Record.
            </Typography>
            <Card elevation={0}>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div>
                    <TextField
                      name="MRID"
                      label="MRID"
                      variant="outlined"
                      fullWidth
                      type="text"
                      error={err}
                      value={values.MRID || ""}
                      className={errors.MRID && touched.MRID && "error"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{ marginBottom: "30px" }}
                    />

                    {errors.MRID && touched.MRID && (
                      <div className={classes.error}> {errors.MRID} </div>
                    )}
                  </div>
                  <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    color="primary"
                    autoFocus
                    fullWidth
                    variant="contained"
                  >
                    Add Patient
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
export default AddPatient;
