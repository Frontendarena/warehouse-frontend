import { IconButton, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Delete, Edit } from "@material-ui/icons";
import axios from "axios";
import { useSnackbar, withSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { EditSalesDialog } from "./EditSales";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export function SalesInfoList() {
  const [salesInfo, setSalesInfo] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [editData, setEditData] = React.useState<any>({});
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const classes = useStyles();
  const handleClickOpen = () => {
    setEditData({ articles: [] });
    setOpen(true);
  };
  const handleSaveClose = (data: any) => {
    if (data.id === undefined) {
      axios
        .post("/sales/", data)
        .then((res: any) => {
          enqueueSnackbar("Sales Added successfully");
          setOpen(false);
          setEditData({});
          fetchAllSalesInfo();
        })
        .catch((err: any) => {
          enqueueSnackbar(err.message);
        });
    } else {
      axios
        .patch("/sales/" + data.productId, data)
        .then((res: any) => {
          enqueueSnackbar("Sales Updated successfully");
          setOpen(false);
          setEditData({});
          fetchAllSalesInfo();
        })
        .catch((err: any) => {
          enqueueSnackbar(err.message);
        });
    }
  };
  const handleClose = () => {
    setOpen(false);
    setEditData({});
  };
  const fetchAllSalesInfo = () => {
    axios
      .get("/sales/")
      .then((res: any) => {
        setSalesInfo(res.data);
        console.log(res);
      })
      .catch((err: any) => {
        enqueueSnackbar(err.message);
      });
  };
  useEffect(() => {
    fetchAllSalesInfo();
  }, []);
  const editClick = (id: any) => {
    axios
      .get("/sales/" + id)
      .then((res: any) => {
        setEditData(res.data);
        setOpen(true);
      })
      .catch((err: any) => {
        enqueueSnackbar(err.message);
      });
  };
  const deleteClick = (id: string) => {
    axios
      .delete("/sales/" + id)
      .then((res: any) => {
        enqueueSnackbar("Product Deleted successfully");
        fetchAllSalesInfo();
      })
      .catch((err: any) => {
        enqueueSnackbar(err.message);
      });
  };
  return (
    <TableContainer component={Paper}>
      <Typography align="center">SalesInfo List</Typography>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Created At</TableCell>
            <TableCell align="left">Product Id</TableCell>
            <TableCell align="right">Amount Sold</TableCell>
            <TableCell align="right">
              <EditSalesDialog
                open={open}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                handleSaveClose={handleSaveClose}
                data={editData}
              ></EditSalesDialog>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {salesInfo.map((row: any) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.createdAt}
              </TableCell>
              <TableCell align="left">{row.productId}</TableCell>
              <TableCell align="right">{row.amountSold}</TableCell>
              <TableCell align="right">
                <IconButton
                  aria-label="edit"
                  onClick={() => {
                    editClick(row.id);
                  }}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    deleteClick(row.id);
                  }}
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default withSnackbar(SalesInfoList);
