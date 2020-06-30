import React from "react";
import {
  Typography,
  Card,
  CardContent,
  Table,
  Grid,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@material-ui/core";
import { Create } from "@material-ui/icons";

const Dashboard = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Card elevation={0}>
            <CardContent>
              <Typography> Total Patients</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card elevation={0}>
            <CardContent>
              <Typography>Total Records</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card elevation={0}>
            <CardContent>
              <Typography>Total Shared Records</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card elevation={0}>
            <CardContent>
              <Typography>Total Files</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Card elevation={0}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TableContainer component={Paper} elevation={0}>
                    <Table aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Hospital Name</TableCell>
                          <TableCell>{}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Email Address</TableCell>
                          <TableCell>{}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>PRID</TableCell>
                          <TableCell>{}</TableCell>
                        </TableRow>
                      </TableHead>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TableContainer component={Paper} elevation={0}>
                    <Table aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <TableCell>State</TableCell>
                          <TableCell>{}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Address</TableCell>
                          <TableCell>{}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Phone Number</TableCell>
                          <TableCell>{}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Phone Number 2</TableCell>
                          <TableCell>{}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Phone Number 3</TableCell>
                          <TableCell>{}</TableCell>
                        </TableRow>
                      </TableHead>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Card elevation={0}>
                    <CardContent>
                      <Typography>Other Actions</Typography>
                      <hr />
                      <div style={{ marginBottom: "20px" }}></div>
                      <Button variant="contained" color="primary">
                        <Create style={{ marginRight: "5px" }} /> Edit Account
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
