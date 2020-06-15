import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  TextField,
  useTheme,
  makeStyles
} from "@material-ui/core";

import { AddCircleOutline } from "@material-ui/icons";

const useStyles = makeStyles((theme)=>({
    dialog:{
        width: "100%"
    }
}))

const AddRecord = () => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        <AddCircleOutline style={{marginRight:"5px"}} />
        ADD NEW RECORD
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
       fullWidth
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Add New A Record"}
        </DialogTitle>
        <form>
          <DialogContent>
            <div>
              <TextField
                name="MRID"
                label="MRID"
                variant="outlined"
                fullWidth
                className={classes.dialog}
                type="text"
                style={{ marginBottom: "20px", marginRight: "10px" }}
              />
            </div>
            <div>
              <TextField
                name="ailments"
                label="Ailments"
                variant="outlined"
                fullWidth
                type="text"
                style={{ marginBottom: "20px", marginRight: "10px" }}
              />
            </div>
            <div>
              <TextField
                name="comments"
                label="Comments"
                variant="outlined"
                fullWidth
                multiline
                type="text"
                style={{ marginBottom: "20px", marginRight: "10px" }}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary" autoFocus>
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default AddRecord;
