import React from "react";
import {
  Typography,
  Breadcrumbs,
  makeStyles,
  Tooltip,
} from "@material-ui/core";
import UploadedFiles from "../Providers/Patient/UploadedFiles";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  links: {
    textDecoration: "none",
    fontSize: "20px",
    color: "#00004f",
  },
}));

const ShareRecordsFile = ({ match, location }) => {
  console.log(location);
  console.log(match);
  //   console.log(location.state.records[0]);
  const { files } = location.state.record;
  //   console.log(files);
  let history = useHistory();

  const goBack = (e) => {
    e.preventDefault();
    history.goBack();
  };
  const classes = useStyles();
  return (
    <div className="content">
      <Typography variant="h5" style={{ marginBottom: "10px" }}>
        Files
      </Typography>
      <Breadcrumbs aria-label="breadcrumb">
        <Tooltip title="Click to go back">
          <div
            onClick={goBack}
            color="textPrimary"
            style={{
              fontSize: "20px",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            All Shared Records
          </div>
        </Tooltip>
        <Link aria-current="page" className={classes.links}>
          Record
        </Link>
      </Breadcrumbs>
      <UploadedFiles files={files} />
    </div>
  );
};

export default ShareRecordsFile;
