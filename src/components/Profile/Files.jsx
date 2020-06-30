import React from "react";
import { makeStyles, Breadcrumbs, Tooltip } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import UploadedFiles from "../Providers/Patient/UploadedFiles";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    width: "30%",
    marginRight: "20px",
    marginTop: "20px",
  },
  media: {
    height: 170,
  },
  cards: {
    display: "flex",
    flexWrap: "wrap",
  },
  links: {
    textDecoration: "none",
    fontSize: "20px",
    color: "#00004f",
  },
}));

const Files = ({ match, location }) => {
  console.log(match);
  console.log(location);
  const { files } = location.state.records;
  const divRef = React.useRef();

  let history = useHistory();
  const goBack = (e) => {
    e.preventDefault();
    history.goBack();
  };

  const classes = useStyles();
  return (
    <div className="content" ref={divRef}>
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
            Records
          </div>
        </Tooltip>
        <div aria-current="page" className={classes.links}>
          {location.state.records.record_name.toUpperCase()}
        </div>
      </Breadcrumbs>

      <UploadedFiles files={files} />
    </div>
  );
};

export default Files;
