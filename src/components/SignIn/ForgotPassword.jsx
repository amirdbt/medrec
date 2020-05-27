import React, { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  LinearProgress,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  let history = useHistory();

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      history.push("/signin");
    }, 2000);
  };
  return (
    <div className="reset-password">
      <Card elevation={0}>
        <CardContent>
          <Typography
            variant="h5"
            component="h2"
            style={{ marginBottom: "5px", marginTop: "20px" }}
          >
            Forgot Password
          </Typography>
          <Typography style={{ marginBottom: "10px" }}>
            Enter your email to reset your password
          </Typography>
          <div>
            <TextField
              type="text"
              placeholder="Email Address *"
              label="Email Address *"
              variant="outlined"
              fullWidth
              style={{ marginBottom: "25px", marginRight: "10px" }}
            />
          </div>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            color="primary"
            fullWidth
            style={{ marginBottom: "20px" }}
          >
            Reset Password
          </Button>
          {loading && (
            <LinearProgress variant="query" style={{ marginTop: "10px" }} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
