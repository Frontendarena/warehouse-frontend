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
import { EditProductDialog } from "./EditProduct";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export function ProductList() {
  const [products, setProducts] = useState<any>([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const [editData, setEditData] = React.useState<any>({});
  const classes = useStyles();
  const editClick = (id: any) => {
    axios
      .get("/products/" + id)
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
      .delete("/products/" + id)
      .then((res: any) => {
        enqueueSnackbar("Product Deleted successfully");
        fetchAllProducts();
      })
      .catch((err: any) => {
        enqueueSnackbar(err.message);
      });
  };
  const handleClickOpen = () => {
    setEditData({ articles: [] });
    setOpen(true);
  };

  const handleSaveClose = (data: any) => {
    const articles: any = [];
    for (let i = 0; i < editData.articles.length; i++) {
      articles.push({
        id: data.formRef.current.elements["id" + i].value,
        amountRequired: Number(
          data.formRef.current.elements["amountRequired" + i].value
        ),
      });
    }
    if (data.id === undefined) {
      axios
        .post("/products/", { name: data.name, articles })
        .then((res: any) => {
          enqueueSnackbar("Product Added successfully");
          setOpen(false);
          setEditData({});
          fetchAllProducts();
        })
        .catch((err: any) => {
          enqueueSnackbar(err.message);
        });
    } else {
      axios
        .patch("/products/" + data.id, { name: data.name, articles })
        .then((res: any) => {
          enqueueSnackbar("Product Updated successfully");
          setOpen(false);
          setEditData({});
          fetchAllProducts();
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
  const deleteArticleFromProduct = (index: number, article: any) => {
    const newData = editData;
    const newArticlesList = newData.articles?.filter(
      (d: any) => d.id !== article.id
    );
    newData.articles = [...newArticlesList];
    console.log(article);
    console.log(newData);
    setOpen(false);
    setEditData({ ...newData });
    setOpen(true);
  };
  const addNewArticleIntoProduct = (index: number) => {
    const newData = editData;
    newData.articles.push({});
    setEditData({ ...newData });
  };
  const fetchAllProducts = () => {
    axios
      .get("/products/")
      .then((res: any) => {
        setProducts(res.data);
        console.log(res);
      })
      .catch((err: any) => {
        enqueueSnackbar(err.message);
        console.log(err.err);
      });
  };
  useEffect(() => {
    fetchAllProducts();
  }, []);
  return (
    <Grid container justify="center">
      <Grid item md={6} xs={12}>
        <TableContainer component={Paper}>
          <Typography align="center">Product List</Typography>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">
                  <EditProductDialog
                    open={open}
                    handleClickOpen={handleClickOpen}
                    handleClose={handleClose}
                    handleSaveClose={handleSaveClose}
                    deleteArticleFromProduct={deleteArticleFromProduct}
                    addNewArticleIntoProduct={addNewArticleIntoProduct}
                    data={editData}
                  ></EditProductDialog>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((row: any) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
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
export default withSnackbar(ProductList);
