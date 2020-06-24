import React from "react";
import { Typography, Breadcrumbs, makeStyles } from "@material-ui/core";
import UploadedFiles from "./UploadedFiles";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  links: {
    textDecoration: "none",
    fontSize: "20px",
    color: "#00004f",
  },
}));

const SharedRecordsFile = ({ match, location }) => {
  console.log(location);
  console.log(match);
  const { files } = location.state.records;
  console.log(files);
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
        <div
          onClick={goBack}
          color="textPrimary"
          style={{
            fontSize: "20px",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          All Records
        </div>
        <Link aria-current="page" className={classes.links}>
          Record
        </Link>
      </Breadcrumbs>
      <UploadedFiles files={files} />
    </div>
  );
};

export default SharedRecordsFile;
