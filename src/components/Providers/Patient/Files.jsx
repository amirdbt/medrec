import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
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
import { Visibility, CloudUploadSharp } from "@material-ui/icons";
import axios from "axios";

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

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

function Previews(props) {
  const [files, setFiles] = useState([]);
  // console.log(props.record);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const uploadFiles = () => {
    const token = localStorage.getItem("token");
    console.log(files);
    setTimeout(() => {
      var formData = new FormData();
      // formData.append("uploads", files[0]);
      files.map((file, index) => {
        formData.append(`file${index}`, file);
      });
      axios
        .patch(
          `https://polar-dusk-61658.herokuapp.com/records/update/files/${props.record}`,
          { uploads: formData },
          { headers: { Authorization: `${token}` } }
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 200);
  };

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p
          style={{
            margin: "10px",
            padding: "80px",
            backgroundColor: "rgba(0,0,0,0.5)",
            cursor: "pointer",
          }}
        >
          <img
            src="https://img.pngio.com/file-png-image-royalty-free-stock-png-images-for-your-design-file-png-256_256.png"
            alt=""
            width="10%"
          />
          Drag 'n' drop some files here, or click to select files
        </p>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
      <Button color="primary" variant="contained" onClick={uploadFiles}>
        <CloudUploadSharp style={{ marginRight: "5px" }} /> Upload
      </Button>
    </section>
  );
}

const Files = ({ record }) => {
  const classes = useStyles();
  return (
    <div>
      <Previews record={record} />
      <div className={classes.cards}>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image="https://img.pngio.com/file-png-image-royalty-free-stock-png-images-for-your-design-file-png-256_256.png"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Example.png
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
              Preview
            </Button>
          </CardActions>
        </Card>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image="https://img.pngio.com/file-png-image-royalty-free-stock-png-images-for-your-design-file-png-256_256.png"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Example2.png
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
              Preview
            </Button>
          </CardActions>
        </Card>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image="https://img.pngio.com/file-png-image-royalty-free-stock-png-images-for-your-design-file-png-256_256.png"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Example3.png
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
              Preview
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};

export default Files;
