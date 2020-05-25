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
    <Formik initialValues={{firstname: "", lastname: "",gender: "",email:"",username: "", password: "",phone:""}} onSubmit={(values, {setSubmitting}) => {
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
        firstname:  Yup.string().required("Required"),
        lastname:  Yup.string().required("Required"),
        email:  Yup.string().email("Invalid email").required("Required"),
        username:  Yup.string().required("Required"),
        gender:  Yup.string().required("Required"),
        password: Yup.string().required("No password provided").min(8),
        phone: Yup.string().required("Required")
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
            name="firstname"
                label="Firstname *"
                fullWidth
                type="text"
                error={err}
                value={values.firstname}
                className={errors.firstname && touched.firstname && "error"}
                // className={classes.text}
                onChange={handleChange}
                onBlur={handleBlur}
              />
         {errors.firstname && touched.firstname && ( <div className={classes.error}> {errors.firstname} </div>)}
              <div style={{ marginTop: "10px" }}></div>
            <TextField
            name="lastname"
                label="Lastname *"
                fullWidth
                type="text"
                error={err}
                value={values.lastname}
                className={errors.lastname && touched.lastname && "error"}
                // className={classes.text}
                onChange={handleChange}
                onBlur={handleBlur}
              />
         {errors.lastname && touched.lastname && ( <div className={classes.error}> {errors.lastname} </div>)}
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
              <div style={{ marginTop: "10px" }}></div>
            <TextField
            name="phone"
                label="Phone Number *"
                fullWidth
                type="text"
                error={err}
                value={values.phone}
                className={errors.phone && touched.phone && "error"}
                // className={classes.text}
                onChange={handleChange}
                onBlur={handleBlur}
              />
         {errors.phone && touched.phone && ( <div className={classes.error}> {errors.phone} </div>)}
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
