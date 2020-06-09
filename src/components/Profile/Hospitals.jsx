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
} from "@material-ui/core";
import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
  RemoveCircle,
} from "@material-ui/icons";
import axios from "axios";
import { Alert } from "@material-ui/lab";

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

const Hospitals = ({ hospitals }) => {
  console.log(hospitals);
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const token = localStorage.getItem("token");

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, hospitals.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const removeProvider = (providerName) => {
    axios
      .patch(
        `https://polar-dusk-61658.herokuapp.com/users/remove_provider/${providerName}`,
        {
          headers: { Authorization: `${token}` },
        }
      )
      .then((res) => {
        console.log(res);
        console.log(res.data.message);
        setMessage(res.data.message);
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err.response.data.error);
        setMessage(err.response.data.error);
        setSeverity("error");
        setSuccess(true);
      });
  };
  return (
    <div>
      <div style={{ marginBottom: "10px" }}></div>
      {success && <Alert severity={severity}>{message}</Alert>}
      <Grid container>
        <Grid item xs={12} sm={12}>
          <TableContainer component={Paper} elevation={0}>
            <Table aria-label="customized table">
              <TableHead className={classes.head}>
                <TableRow>
                  <TableCell className={classes.text}>Name</TableCell>
                  <TableCell className={classes.text}>PRID</TableCell>
                  <TableCell className={classes.text}>Email</TableCell>
                  <TableCell className={classes.text}>Address</TableCell>
                  <TableCell className={classes.text}>State</TableCell>
                  <TableCell className={classes.text}>Phone Number</TableCell>
                  <TableCell className={classes.text}>Phone Number 2</TableCell>
                  <TableCell className={classes.text}>Phone Number 3</TableCell>
                  <TableCell className={classes.text}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? hospitals.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : hospitals
                ).map((hospital) => (
                  <TableRow key={hospital._id}>
                    <TableCell>{hospital.providerName}</TableCell>
                    <TableCell>{hospital.PRID}</TableCell>
                    <TableCell>{hospital.email}</TableCell>
                    <TableCell>{hospital.address}</TableCell>
                    <TableCell>{hospital.state}</TableCell>
                    <TableCell>{hospital.phone_number_main}</TableCell>
                    <TableCell>{hospital.phone_number_two}</TableCell>
                    <TableCell>{hospital.phone_number_three}</TableCell>
                    <TableCell>
                      <Tooltip title="Remove Hospital">
                        <IconButton
                          aria-label="remove hospital"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you want to remove this Provider?"
                              )
                            )
                              removeProvider(hospital.providerName);
                          }}
                        >
                          <RemoveCircle />
                        </IconButton>
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
                    count={hospitals.length}
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
    </div>
  );
};

export default Hospitals;
