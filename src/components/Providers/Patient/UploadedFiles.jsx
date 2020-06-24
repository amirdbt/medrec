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

const useStyles = makeStyles(() => ({
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
  function getFile(file) {
    if (file.includes("pdf")) {
      return "https://banner2.cleanpng.com/20180420/ypq/kisspng-pdf-computer-icons-theme-clip-art-cool-business-card-background-5ad9c522531736.0976301015242212183404.jpg";
    } else if (
      file.includes("doc") ||
      file.includes("docx") ||
      file.includes("txt")
    ) {
      return "https://banner2.cleanpng.com/20180724/bsf/kisspng-google-docs-computer-icons-microsoft-google-drive-google-icon-5b56c718d11477.1116395315324137208564.jpg";
    } else if (
      file.includes("xls") ||
      file.includes("xlsx") ||
      file.includes("csv")
    ) {
      return "https://banner2.cleanpng.com/20180702/hph/kisspng-computer-icons-google-sheets-5b3a2f1b216e87.3834502715305398031369.jpg";
    } else return file;
  }

  return (
    <div className={classes.cards}>
      {files.map((file) => (
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={getFile(file)}
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
