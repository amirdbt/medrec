import React from "react";
import {
  Typography,
  Card,
  CardContent,
  TextField,
  makeStyles,
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const Settings = () => {
  const classes = useStyles();
  const firstName = localStorage.getItem("firstName")
  const lastName = localStorage.getItem("lastName")
  const email = localStorage.getItem("email")
  const userName = localStorage.getItem("userName")
  
  return (
    <div className="content">
      <Typography variant="h4">User Settings</Typography>
      <Card elevation={0}>
        <CardContent>
          <div className={classes.input}>
            <TextField
              label="First name"
              defaultValue={firstName}
              variant="outlined"
              fullWidth
              style={{ marginBottom: "20px", marginRight: "10px" }}
            />
            <TextField
              label="Last name"
              defaultValue={lastName}
              variant="outlined"
              fullWidth
              style={{ marginBottom: "20px" }}
            />
          </div>
          <div>
            <TextField
              label="Email"
              defaultValue={email}
              variant="outlined"
              fullWidth
              style={{ marginBottom: "20px" }}
            />
          </div>
          <div>
            <TextField
              label="Username"
              defaultValue={userName}
              placeholder="UserName"
              variant="outlined"
              fullWidth
              style={{ marginBottom: "20px" }}
            />
          </div>
          <div>
            <TextField
              label="Date of birth"
              placeholder="Date of birth"
              variant="outlined"
              fullWidth
              style={{ marginBottom: "20px" }}
            />
          </div>
          <div>
            <TextField
              label="Phone Number"
              placeholder="Phone Number"
              variant="outlined"
              fullWidth
              style={{ marginBottom: "20px" }}
            />
          </div>
          <div className={classes.input}>
            <FormControl fullWidth variant="outlined"   style={{ marginBottom: "20px", marginRight: "10px" }}>
              <InputLabel id="demo-simple-select-outlined-label">
                Blood Group
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                fullWidth
                label="Blood Group"
                name="bloodGroup"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="A+">A+</MenuItem>
                <MenuItem value="A-">A-</MenuItem>
                <MenuItem value="B+">B+</MenuItem>
                <MenuItem value="B-">B-</MenuItem>
                <MenuItem value="O+">O+</MenuItem>
                <MenuItem value="O-">O-</MenuItem>
                <MenuItem value="AB+">AB+</MenuItem>
                <MenuItem value="AB-">AB-</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Genotype"
              placeholder="Genotype"
              variant="outlined"
              fullWidth
              style={{ marginBottom: "20px", marginRight: "10px" }}
            />
          </div>
          <div className={classes.input}>
            <TextField
              label="Next of kin"
              placeholder="Next of kin"
              variant="outlined"
              fullWidth
              style={{ marginBottom: "20px", marginRight: "10px" }}
            />
            <TextField
              label="Nationality"
              placeholder="Nationality"
              variant="outlined"
              fullWidth
              style={{ marginBottom: "20px", marginRight: "10px" }}
            />
            <TextField
              label="State of origin"
              placeholder="State of origin"
              variant="outlined"
              fullWidth
              style={{ marginBottom: "20px" }}
            />
          </div>
          <Button variant="contained" color="primary">
            Save changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
