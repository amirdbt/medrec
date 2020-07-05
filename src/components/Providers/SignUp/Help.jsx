import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
  DialogContentText,
  IconButton,
} from "@material-ui/core";

import { Help } from "@material-ui/icons";

const HelpInfo = () => {
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
      <IconButton
        color="primary"
        onClick={handleClickOpen}
        style={{ marginTop: "-15px" }}
      >
        <Help />
      </IconButton>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        fullWidth
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Information regarding password validation"}
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Password must contain at least 8 characters,one lowercase, one
            uppercase, one number and one special character. <br /> Example:
            Realmadrid10!@# <br /> If you are not sure of your password
            strength, you can use the link below.
            <br />
            <a
              href="https://www.my1login.com/resources/password-strength-test/"
              target="_blank"
            >
              Test your password here
            </a>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HelpInfo;
