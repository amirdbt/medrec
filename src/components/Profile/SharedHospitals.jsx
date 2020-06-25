import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
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
  Grid,
  Tooltip,
  Snackbar,
  Slide,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import {
  LocalHospital,
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
  RemoveCircle,
} from "@material-ui/icons";
import axios from "axios";

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

const SharedHospitals = ({ hospitals, record }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const theme = useTheme();
  const [al, setAl] = useState(false);

  const [message, setMessage] = useState("");

  const [severity, setSeverity] = useState("success");
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const divRef = React.useRef();
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, hospitals.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let token = localStorage.getItem("token");

  const removeProvider = (providerName) => {
    axios
      .post(
        `https://polar-dusk-61658.herokuapp.com/users/remove_provider/${record}`,
        { providerName },
        {
          headers: { Authorization: `${token}` },
        }
      )
      .then((res) => {
        console.log(res);
        setMessage(res.data);
        setAl(true);

        setTimeout(() => {
          window.location.reload(false);
        }, 500);
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data);

        setAl(true);
        setSeverity("error");

        setTimeout(() => {
          window.location.reload(false);
        }, 500);
      });
  };

  return (
    <div>
      <Button size="small" color="secondary" onClick={handleClickOpen}>
        <LocalHospital style={{ marginRight: "2px" }} />
        Shared With
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        maxWidth="md"
        onClose={handleClose}
        fullWidth
        aria-labelledby="responsive-dialog-title"
      >
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
        <DialogTitle id="responsive-dialog-title">
          {"Hospitals you shared your records with"}
        </DialogTitle>

        <DialogContent>
          <Grid container>
            <Grid item xs={12} sm={12}>
              <TableContainer component={Paper} elevation={0} ref={divRef}>
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
                      ? hospitals.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : hospitals
                    ).map((hospital) => (
                      <TableRow key={hospital._id}>
                        <TableCell>{hospital.providerName}</TableCell>

                        <TableCell>{hospital.email}</TableCell>

                        <TableCell>{hospital.state}</TableCell>
                        <TableCell>{hospital.phone_number_main}</TableCell>
                        <TableCell>
                          <Tooltip title="Remove Hospital">
                            <IconButton
                              color="secondary"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Are you sure you want to remove this hospital?"
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
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SharedHospitals;
