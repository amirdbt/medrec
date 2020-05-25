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

const SignUp = () => {
  const [err, setErr] = useState(false);
  const [message,setMessage] = useState('')

  const classes = useStyles();

  return(
    <Formik initialValues={{firstName: "", lastName: "",gender: "",email:"",userName: "", password: "",phoneNumber:""}} onSubmit={(values, {setSubmitting}) => {
        setTimeout(()=>{
          console.log("Signing up", values)
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
        firstName:  Yup.string().required("Required"),
        lastName:  Yup.string().required("Required"),
        email:  Yup.string().email("Invalid email").required("Required"),
        userName:  Yup.string().required("Required"),
        gender:  Yup.string().required("Required"),
        password: Yup.string().required("No password provided").min(8),
        phoneNumber: Yup.string().required("Required")
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
                <Typography variant="h5">Welcome To MedRec</Typography>
                <Typography variant="caption">
                  Sign up
                </Typography>
              </div>
  
            <div className={classes.textfields}>
            <TextField
            name="firstName"
                label="Firstname *"
                fullWidth
                type="text"
                error={err}
                value={values.firstName}
                className={errors.firstName && touched.firstName && "error"}
                // className={classes.text}
                onChange={handleChange}
                onBlur={handleBlur}
              />
         {errors.firstName && touched.firstName && ( <div className={classes.error}> {errors.firstName} </div>)}
              <div style={{ marginTop: "10px" }}></div>
            <TextField
            name="lastName"
                label="Lastname *"
                fullWidth
                type="text"
                error={err}
                value={values.lastName}
                className={errors.lastName && touched.lastName && "error"}
                // className={classes.text}
                onChange={handleChange}
                onBlur={handleBlur}
              />
         {errors.lastName && touched.lastName && ( <div className={classes.error}> {errors.lastName} </div>)}
              <div style={{ marginTop: "10px" }}></div>
            <TextField
            name="email"
                label="Email Address *"
                fullWidth
                type="email"
                error={err}
                value={values.email}
                className={errors.email && touched.email && "error"}
                // className={classes.text}
                onChange={handleChange}
                onBlur={handleBlur}
              />
         {errors.email && touched.email && ( <div className={classes.error}> {errors.email} </div>)}
              <div style={{ marginTop: "10px" }}></div>
            <TextField
            name="userName"
                label="Username *"
                fullWidth
                type="text"
                error={err}
                value={values.userName}
                className={errors.userName && touched.userName && "error"}
                // className={classes.text}
                onChange={handleChange}
                onBlur={handleBlur}
              />
         {errors.userName && touched.userName && ( <div className={classes.error}> {errors.userName} </div>)}
              <div style={{ marginTop: "10px" }}></div>
            <TextField
            name="phoneNumber"
                label="Phone Number *"
                fullWidth
                type="text"
                error={err}
                value={values.phoneNumber}
                className={errors.phoneNumber && touched.phoneNumber && "error"}
                // className={classes.text}
                onChange={handleChange}
                onBlur={handleBlur}
              />
         {errors.phoneNumber && touched.phoneNumber && ( <div className={classes.error}> {errors.phoneNumber} </div>)}
              <div style={{ marginTop: "10px" }}></div>
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
                Sign up
              </Button>
  
              {isSubmitting && (
                <LinearProgress variant="query" style={{ marginTop: "10px" }} />
              )}
  
              <div style={{ marginTop: "20px" }}></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
            
                <Link href="/sign-in" variant="body2">
                  Sign in
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
export default SignUp;
