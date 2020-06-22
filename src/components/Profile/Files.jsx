import React from "react";
import {
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Typography,
  makeStyles,
  Button,
  CardActions,
  Breadcrumbs,
} from "@material-ui/core";
import { Visibility } from "@material-ui/icons";
import { Link } from "react-router-dom";

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
  console.log(files);
  const classes = useStyles();
  return (
    <div className="content">
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          to={`/hospitals`}
          color="textPrimary"
          style={{ fontSize: "20px", textDecoration: "none" }}
        >
          Records
        </Link>
        <Link aria-current="page" className={classes.links}>
          {location.state.records.record_name.toUpperCase()}
        </Link>
      </Breadcrumbs>
      <Typography variant="h5">Files</Typography>
      <div className={classes.cards}>
        {files.map((file) => (
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={file}
                title="Patient File"
              />
              <CardContent>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                ></Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <a
                href={file}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <Button size="small" color="primary">
                  <Visibility style={{ marginRight: "5px" }} />
                  Preview
                </Button>
              </a>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Files;
