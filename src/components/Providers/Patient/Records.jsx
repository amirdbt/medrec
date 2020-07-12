import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
  makeStyles,
  Grid,
  CircularProgress,
  CardHeader,
} from "@material-ui/core";
import { Visibility } from "@material-ui/icons";
import AddRecord from "./AddRecord";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchBox from "./SearchBox";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    width: "20%",
    marginRight: "20px",
    marginTop: "20px",
    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
    marginBottom: "-10px",
  },
  cards: {
    display: "flex",
    flexWrap: "wrap",
  },
}));

const Records = ({ user_id, MRID, username }) => {
  const [patientRecords, setPatientRecords] = useState([]);
  const [totalRecords, setTotalRecords] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchField, setSearchField] = useState("");
  console.log(MRID);
  useEffect(() => {
    fetchRecords();
    console.log("hello");
  }, []);

  const fetchRecords = () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    console.log(token);
    axios
      .post(
        `https://polar-dusk-61658.herokuapp.com/records/patient/all
    `,
        { MRID: MRID },
        { headers: { Authorization: `${token}` } }
      )
      .then((response) => {
        console.log(response.data);
        setPatientRecords(response.data.records);
        setTotalRecords(response.data.total_records);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const searchChange = (e) => {
    setSearchField(e.target.value);
  };
  const filteredRecords = patientRecords.filter((records) => {
    return records.record_name
      .toLowerCase()
      .includes(searchField.toLowerCase());
  });

  const classes = useStyles();
  return (
    <div>
      {loading ? (
        <CircularProgress style={{ marginLeft: "50%" }} />
      ) : (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <AddRecord user_id={user_id} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <SearchBox place="Search record" searchChange={searchChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card elevation={0}>
                <CardContent>
                  <Typography variant="h5">
                    Total Number of Records: {totalRecords}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <div className={classes.cards}>
            {filteredRecords.map((records) => (
              <Card className={classes.root} elevation={1} key={records._id}>
                <CardHeader
                  subheader={`Name: ${records.record_name.toUpperCase()}`}
                />

                <CardMedia
                  className={classes.media}
                  image="data:image/png;base64,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"
                  title="Records"
                />

                <CardActions>
                  <Link
                    to={{
                      pathname: `/all-records/${records._id}`,
                      state: { username },
                    }}
                    style={{ textDecoration: "none" }}
                  >
                    <Button size="small" color="primary">
                      <Visibility style={{ marginRight: "2px" }} />
                      View
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Records;
