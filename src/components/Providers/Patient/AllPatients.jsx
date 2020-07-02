import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Paper,
  makeStyles,
  CircularProgress,
  IconButton,
  useTheme,
  Grid,
} from "@material-ui/core";
import {
  AccountCircle,
  ArrowForward,
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
} from "@material-ui/icons";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchBox from "./SearchBox";

const useStyles = makeStyles((theme) => ({
  head: {
    backgroundColor: "#1a237e",
  },
  text: {
    color: "#fff",
  },
}));
const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.0),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPage /> : <FirstPage />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPage /> : <LastPage />}
      </IconButton>
    </div>
  );
}

const AllPatients = () => {
  const [patients, setPatients] = useState([]);
  const [totalPatients, setTotalPatients] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [searchField, setSearchField] = useState("");

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, patients.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const searchChange = (e) => {
    setSearchField(e.target.value);
  };
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    setLoading(true);
    const response = await axios.get(
      `https://polar-dusk-61658.herokuapp.com/providers/all_patients`,
      { headers: { Authorization: `${token}` } }
    );
    setPatients(response.data.patients);
    setTotalPatients(response.data.totalPatients);
    setLoading(false);
    console.log(response.data);
  };
  const filteredPatients = patients.filter((patient) => {
    return patient.lastName.toLowerCase().includes(searchField.toLowerCase());
  });
  return (
    <div className="content">
      {loading ? (
        <CircularProgress style={{ marginLeft: "50%" }} />
      ) : (
        <>
          <SearchBox searchChange={searchChange} place="Search by last name" />
          <Card elevation={0} className={classes.head}>
            <CardContent>
              <div style={{ display: "flex" }}>
                <AccountCircle
                  style={{
                    color: "#fff",
                    fontSize: "40px",
                    marginRight: "5px",
                  }}
                />
                <Typography variant="h5" style={{ color: "#fff" }}>
                  {" "}
                  All Patients
                </Typography>
              </div>
              <Typography
                variant="h3"
                style={{ textAlign: "center", color: "#fff" }}
              >
                <CountUp
                  start={0}
                  end={totalPatients}
                  duration={2.5}
                  separator=","
                />
              </Typography>
            </CardContent>
          </Card>
          <div style={{ marginBottom: "10px" }}></div>
          <Grid container>
            <Grid item xs={12} sm={12}>
              <TableContainer component={Paper} elevation={0}>
                <Table aria-label="customized table">
                  <TableHead className={classes.head}>
                    <TableRow>
                      <TableCell className={classes.text}>First Name</TableCell>
                      <TableCell className={classes.text}>Last Name</TableCell>
                      <TableCell className={classes.text}>Email</TableCell>
                      <TableCell className={classes.text}>Gender</TableCell>
                      <TableCell className={classes.text}>Username</TableCell>
                      <TableCell className={classes.text}>
                        Phone Number
                      </TableCell>
                      <TableCell className={classes.text}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? filteredPatients.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : filteredPatients
                    ).map((patient) => (
                      <TableRow key={patient.id}>
                        <TableCell>{patient.firstName}</TableCell>
                        <TableCell>{patient.lastName}</TableCell>
                        <TableCell>{patient.email}</TableCell>
                        <TableCell>{patient.gender}</TableCell>
                        <TableCell>{patient.userName}</TableCell>
                        <TableCell>{patient.phoneNumber}</TableCell>
                        <TableCell>
                          <Link to={`/all-patients/${patient.userName}`}>
                            <IconButton>
                              <ArrowForward />
                            </IconButton>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}

                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[
                          5,
                          10,
                          25,
                          { label: "All", value: -1 },
                        ]}
                        colSpan={3}
                        count={filteredPatients.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                          inputProps: { "aria-label": "rows per page" },
                          native: true,
                        }}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
};

export default AllPatients;
