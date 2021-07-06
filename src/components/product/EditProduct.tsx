import { Grid, IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { Add, Delete, DeleteOutline } from "@material-ui/icons";
import React from "react";

export function EditProductDialog(props: any) {
  const nameRef = React.useRef<any>();
  const formRef = React.useRef<any>();
  return (
    <div>
      <IconButton aria-label="add" onClick={props.handleClickOpen}>
        <Add />
      </IconButton>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
        disableBackdropClick
      >
        <DialogTitle id="form-dialog-title">
          {props.data.id ? "Edit Product" : "Add New Product"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                inputRef={nameRef}
                defaultValue={props.data?.name}
              />
            </Grid>
          </Grid>{" "}
          <form ref={formRef}>
            {" "}
            {props?.data?.articles?.map((article: any, index: any) => {
              console.log(article);
              return (
                <Grid container spacing={2} key={index}>
                  <Grid item xs={6}>
                    <TextField
                      autoFocus
                      margin="dense"
                      id={"id" + index}
                      label="ID"
                      type="text"
                      defaultValue={article.id}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      autoFocus
                      margin="dense"
                      id={"amountRequired" + index}
                      label="Amount"
                      type="number"
                      defaultValue={article.amountRequired}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        props.deleteArticleFromProduct(index, article);
                      }}
                    >
                      <DeleteOutline />
                    </IconButton>
                  </Grid>
                </Grid>
              );
            })}{" "}
          </form>
          <Grid container spacing={2} justify="center">
            <Grid item xs={1}>
              <IconButton
                aria-label="add"
                onClick={() => {
                  props.addNewArticleIntoProduct();
                }}
              >
                <Add />
              </IconButton>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              props.handleSaveClose({
                id: props.data?.id,
                name: nameRef?.current?.value,
                formRef: formRef,
              });
            }}
            color="primary"
          >
            {props.data.id ? "Save" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
