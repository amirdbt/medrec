import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
  Grid,
  Table,
  TableCell,
  IconButton,
  TableContainer,
  TableHead,
  Paper,
  Tooltip,
  TableRow,
} from "@material-ui/core";
import moment from "moment";

import { Info } from "@material-ui/icons";

const ViewRecordDetails = ({ records }) => {
  const [open, setOpen] = useState(false);

  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="Click to view information about this record" arrow>
        <IconButton size="small" color="info" onClick={handleClickOpen}>
          <Info style={{ fontSize: "20px" }} />
        </IconButton>
      </Tooltip>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        fullWidth
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Record Info"}</DialogTitle>

        <DialogContent>
          <Grid item xs={12} sm={12}>
            <TableContainer component={Paper} elevation={0}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <TableCell>Ailments</TableCell>
                    <TableCell>{records.ailments[0]}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Comments</TableCell>
                    <TableCell> {records.comment}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Created at</TableCell>
                    <TableCell>
                      {" "}
                      {moment(records.createdAt).format("DD MMM, YYYY")}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Updated at</TableCell>
                    <TableCell>
                      {" "}
                      {moment(records.updatedAt).format("DD MMM, YYYY")}
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ViewRecordDetails;
