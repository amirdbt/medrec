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
} from "@material-ui/core";
import { Visibility } from "@material-ui/icons";

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
}));

const UploadedFiles = ({ files }) => {
  console.log(files);
  const classes = useStyles();
  return (
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
  );
};

export default UploadedFiles;
