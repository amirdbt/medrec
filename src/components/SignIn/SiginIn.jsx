import React, { useState } from "react";
import {
  Card,
  CardContent,
  Button,
  Typography,
  TextField,
  Link,
  LinearProgress,
  makeStyles
} from "@material-ui/core";
import {Alert} from "@material-ui/lab"
import {Formik } from "formik"
import * as Yup from "yup"
import axios from "axios"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "50%",
    display: "flex",
    justifyContent: "center",
    '@media (max-width: 1080px)':{
      width: "100%"
    }
  },
  text: {
    width: "550px",
    '@media (max-width: 1080px)':{
      width: "100%"
    }
  },
  display: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    textAlign: "center",
    marginTop: "50px",
},
textfields:{
    margin: " 0 100px",
    
  },
  error:{
    color: "rgb(235, 54, 54)",
  }
}));

const SiginIn = () => {
  const [err, setErr] = useState(false);
  const [message,setMessage] = useState('')

  const classes = useStyles();

  return(
    <Formik initialValues={{username: "", password: ""}} onSubmit={(values, {setSubmitting}) => {
      setTimeout(()=>{
        console.log("Logging in", values)
        axios.post(``, values)
        .then(res =>{
  
        })
        .catch(err =>{
          console.log(err)
          setErr(true)
          setMessage(err)
        })
        setSubmitting(false)
      },500)
    }} 
    validationSchema={Yup.object().shape({
      username:  Yup.string().required("Required"),
      password: Yup.string().required("No password provided").min(8)
    })}
    >
      {props => {const {values,touched,errors,isSubmitting,handleChange, handleBlur, handleSubmit} = props
    return (
      <div className="sign">
        {err ? (
          <Alert severity="error">{message}</Alert>
        ) : (<div></div>) }
        <Card className={classes.root} elevation={0}>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className={classes.display}>
                <Typography variant="h5">Welcome Back To MedRec</Typography>
                <Typography variant="caption">
                  Sign in to your account to continue
                </Typography>
              </div>
  
            <div className={classes.textfields}>
            <TextField
            name="username"
                label="Username *"
                fullWidth
                type="text"
                error={err}
                value={values.username}
                className={errors.username && touched.username && "error"}
                // className={classes.text}
                onChange={handleChange}
                onBlur={handleBlur}
              />
         {errors.username && touched.username && ( <div className={classes.error}> {errors.username} </div>)}
              <div style={{ marginTop: "20px" }}></div>
              <TextField
              name="password"
                label="Password *"
                fullWidth
                type="password"
                error={err}
                className={errors.password && touched.password && "error"}
                // className={classes.text}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password && ( <div className={classes.error}> {errors.password} </div>)}
              <div style={{ marginTop: "30px" }}></div>
  
              <Button
                variant="contained"
                color="primary"
                className={classes.text}
                disabled={isSubmitting}
                onClick={handleSubmit}
              >
                Sign in
              </Button>
  
              {isSubmitting && (
                <LinearProgress variant="query" style={{ marginTop: "10px" }} />
              )}
  
              <div style={{ marginTop: "20px" }}></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Link href="#" variant="body2">
                  Forgot password
                </Link>
                <Link href="/sign-up" variant="body2">
                  Sign up
                </Link>
              </div>
              <div style={{ marginBottom: "50px" }}></div>
            </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
    }}

    </Formik>
  )
  }
export default SiginIn;
