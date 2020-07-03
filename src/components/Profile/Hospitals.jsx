import React, { useState, useEffect } from "react";
import {
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
  IconButton,
  useTheme,
  Grid,
  Tooltip,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
  ArrowForward,
} from "@material-ui/icons";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchBox from "../Providers/Patient/SearchBox";
import { Alert, AlertTitle } from "@material-ui/lab";

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

const Hospitals = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchField, setSearchField] = useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [err, setErr] = useState(false);
  const token = localStorage.getItem("token");
  const divRef = React.useRef();
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, hospitals.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const searchChange = (e) => {
    setSearchField(e.target.value);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    const fetchUser = () => {
      setLoading(true);
      axios
        .get(`https://polar-dusk-61658.herokuapp.com/users/user_info`, {
          headers: { Authorization: `${token}` },
        })
        .then((res) => {
          console.log(res.data.user);
          setHospitals(res.data.user.hospitals);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setErr(true);
        });
    };
    fetchUser();
  }, [token]);
  const filteredHospitals = hospitals.length
    ? hospitals.filter((hospital) => {
        return hospital.providerName
          .toLowerCase()
          .includes(searchField.toLowerCase());
      })
    : "";
  return (
    <div className="content" ref={divRef}>
      {err && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          There is an error with the server. Please refresh the page.
        </Alert>
      )}
      <Typography variant="h5" style={{ marginBottom: "20px" }}>
        Hospitals (Providers)
      </Typography>
      <SearchBox place="Search hospital..." searchChange={searchChange} />
      {loading ? (
        <CircularProgress style={{ marginLeft: "50%" }} />
      ) : (
        <>
          <Grid container>
            {filteredHospitals.length ? (
              <Grid item xs={12} sm={12}>
                <TableContainer component={Paper} elevation={0}>
                  <Table aria-label="customized table">
                    <TableHead className={classes.head}>
                      <TableRow>
                        <TableCell className={classes.text}>Name</TableCell>

                        <TableCell className={classes.text}>Email</TableCell>

                        <TableCell className={classes.text}>State</TableCell>
                        <TableCell className={classes.text}>
                          Phone Number
                        </TableCell>

                        <TableCell className={classes.text}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(rowsPerPage > 0
                        ? filteredHospitals.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : filteredHospitals
                      ).map((hospital) => (
                        <TableRow key={hospital._id}>
                          <TableCell>{hospital.providerName}</TableCell>

                          <TableCell>{hospital.email}</TableCell>

                          <TableCell>{hospital.state}</TableCell>
                          <TableCell>{hospital.phone_number_main}</TableCell>

                          <TableCell>
                            <Tooltip title="View Hospital">
                              <Link
                                to={{
                                  pathname: `/hospitals/${hospital.providerName}`,
                                  state: { hospital },
                                }}
                              >
                                <IconButton aria-label="View hospital">
                                  <ArrowForward />
                                </IconButton>
                              </Link>
                            </Tooltip>
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
                          count={filteredHospitals.length}
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
            ) : (
              <Grid item>
                <Typography variant="h5">No Hospitals</Typography>
              </Grid>
            )}
          </Grid>
        </>
      )}
    </div>
  );
};

export default Hospitals;
