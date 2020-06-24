import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button, LinearProgress, Slide, Snackbar } from "@material-ui/core";
import { CloudUploadSharp } from "@material-ui/icons";
import { Alert, AlertTitle } from "@material-ui/lab";
import axios from "axios";
import UploadedFiles from "./UploadedFiles";

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
  // const [err, setErr] = useState(false);
  const [al, setAl] = useState(false);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [open, setOpen] = useState(false);

  // console.log(props.record);
  const { getRootProps, getInputProps } = useDropzone({
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
  const handleClose = () => {
    setOpen(false);
  };

  const uploadFiles = (e) => {
    let token = localStorage.getItem("token");
    console.log(files);
    setLoading(true);
    let formData = new FormData();
    files.map((file, index) => {
      formData.append("uploads", file);
    });
    console.log(formData.get("uploads"));
    setTimeout(() => {
      axios
        .post(
          `https://polar-dusk-61658.herokuapp.com/records/update/files/${props.record}`,
          formData,
          {
            headers: {
              Authorization: `${token}`,
              "content-type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          console.log(res.data.message);
          setMessage(res.data.message);
          setAl(true);
          setLoading(false);
          setTimeout(() => {
            window.location.reload(false);
          }, 500);
        })
        .catch((err) => {
          console.log(err);
          setMessage(err.response.data);

          setAl(true);
          setSeverity("error");
          setLoading(false);
          setTimeout(() => {
            window.location.reload(false);
          }, 500);
        });
    }, 200);
  };

  return (
    <section className="container">
      {al ? (
        <>
          <Alert severity={severity}>
            <AlertTitle>{severity}</AlertTitle>
            {message}
          </Alert>
          <Snackbar
            open={open}
            autoHideDuration={3000}
            TransitionComponent={Slide}
            onClose={handleClose}
          >
            <Alert severity={severity}>{message}</Alert>
          </Snackbar>
        </>
      ) : (
        <div></div>
      )}

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
      <Button
        color="primary"
        variant="contained"
        onClick={uploadFiles}
        disabled={loading}
        style={{ marginBottom: "5px" }}
      >
        <CloudUploadSharp style={{ marginRight: "5px" }} /> Upload
      </Button>
      {loading ? <LinearProgress /> : <div></div>}
    </section>
  );
}

const Files = ({ record, files }) => {
  return (
    <div>
      <Previews record={record} />
      <UploadedFiles files={files} />
    </div>
  );
};

export default Files;
