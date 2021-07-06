import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Grid, IconButton, Typography } from "@material-ui/core";
import { useSnackbar, withSnackbar } from "notistack";
import { Delete, Edit } from "@material-ui/icons";
import axios from "axios";
import { EditArticleDialog } from "./EditArticle";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import { EditBulkArticleDialog } from "./EditBulkArticleDialog";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export function ArticleList() {
  const [articles, setArticles] = useState<any>([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({});
  const [openBulk, setOpenBulk] = React.useState(false);
  const [bulkData, setBulkData] = React.useState([]);
  const classes = useStyles();
  const editClick = (id: any) => {
    axios
      .get("/articles/" + id)
      .then((res: any) => {
        setData(res.data);
        setOpen(true);
      })
      .catch((err: any) => {
        enqueueSnackbar(err.message);
      });
  };
  const deleteClick = (id: string) => {
    axios
      .delete("/articles/" + id)
      .then((res: any) => {
        enqueueSnackbar("Article Deleted successfully");
        fetchAllArticles();
      })
      .catch((err: any) => {
        enqueueSnackbar(err.message);
      });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleBulkClickOpen = () => {
    setBulkData(articles);
    setOpenBulk(true);
  };
  const handleSaveClose = (data: any) => {
    if (data.id === undefined) {
      axios
        .post("/articles/", data)
        .then((res: any) => {
          enqueueSnackbar("Article Added successfully");
          fetchAllArticles();
        })
        .catch((err: any) => {
          enqueueSnackbar(err.message);
          console.log(err);
        });
    } else {
      axios
        .patch("/articles/" + data.id, data)
        .then((res: any) => {
          enqueueSnackbar("Article Updated successfully");
          fetchAllArticles();
        })
        .catch((err: any) => {
          enqueueSnackbar(err.message);
          console.log(err);
        });
    }
    setOpen(false);
    setData({});
  };
  const handleBulkSaveClose = (data: any) => {
    const updateData: any = [];
    for (let i = 0; i < articles.length; i++) {
      updateData.push({
        id: articles[i].id,
        name: data.formRef.current.elements["name" + i].value,
        amountRequired: Number(
          data.formRef.current.elements["quantity" + i].value
        ),
      });
    }
    axios
      .patch("/articles/", updateData)
      .then((res: any) => {
        enqueueSnackbar("Article Updated successfully");
        fetchAllArticles();
        setOpenBulk(false);
        setBulkData([]);
      })
      .catch((err: any) => {
        enqueueSnackbar(err.message);
        console.log(err);
      });
  
  };
  const handleClose = () => {
    setOpen(false);
    setData({});
  };
  const handleBulkClose = () => {
    setOpenBulk(false);
    setBulkData([]);
  };
  const fetchAllArticles = () => {
    axios
      .get("/articles/")
      .then((res: any) => {
        setArticles(res.data);
        console.log(res);
      })
      .catch((err: any) => {
        enqueueSnackbar(err.message);
        console.log(err);
      });
  };
  useEffect(() => {
    fetchAllArticles();
  }, []);
  return (
    <Grid container justify="center">
      <Grid item md={6} xs={12}>
        <TableContainer component={Paper}>
          <Typography align="center">Article List</Typography>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="left">Amount in Stock</TableCell>
                <TableCell align="right">
                  <Grid container style={{ textAlign: "right" }}>
                    <Grid item xs={10}>
                      <EditArticleDialog
                        open={open}
                        handleClickOpen={handleClickOpen}
                        handleClose={handleClose}
                        handleSaveClose={handleSaveClose}
                        data={data}
                      ></EditArticleDialog>
                    </Grid>
                    <Grid item xs={2}>
                      <EditBulkArticleDialog
                        openBulk={openBulk}
                        handleBulkClickOpen={handleBulkClickOpen}
                        handleBulkClose={handleBulkClose}
                        handleBulkSaveClose={handleBulkSaveClose}
                        bulkData={bulkData}
                      ></EditBulkArticleDialog>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {articles.map((row: any) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.amountInStock}</TableCell>
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
      </Grid>
    </Grid>
  );
}
export default withSnackbar(ArticleList);
