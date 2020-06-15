import React from "react";
import {
  Typography,
  Card,
  CardContent,
  CardActionArea,
  CardActions,
  CardMedia,
  Button,
  makeStyles,
} from "@material-ui/core";
import { Visibility } from "@material-ui/icons";
import AddRecord from "./AddRecord";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
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
});

const Records = () => {
  const classes = useStyles();
  return (
    <div>
      <AddRecord />
      <div className={classes.cards}>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image="data:image/png;base64,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"
              title="Records"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Day 1
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
              ></Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Link to="/all-records/1">
              <Button size="small" color="primary">
                <Visibility style={{ marginRight: "5px" }} />
                View
              </Button>
            </Link>
          </CardActions>
        </Card>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image="data:image/png;base64,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"
              title="Records"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Day 2
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
              ></Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              <Visibility style={{ marginRight: "5px" }} />
              View
            </Button>
          </CardActions>
        </Card>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image="data:image/png;base64,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"
              title="Records"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Day 3
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
              ></Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              <Visibility style={{ marginRight: "5px" }} />
              View
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};

export default Records;
