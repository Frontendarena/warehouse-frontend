import { Grid, IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { Add } from "@material-ui/icons";
import React from "react";

export function EditArticleDialog(props: any) {
  const nameRef = React.useRef<any>();
  const amountInStockRef = React.useRef<any>();
  return (
    <div>
      <IconButton aria-label="add" onClick={props.handleClickOpen}>
        <Add />
      </IconButton>
      <Dialog
        disableBackdropClick
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {props.data.id ? "Edit Article" : "Add New Article"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
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
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                id="quantity"
                label="Quantity"
                type="number"
                inputRef={amountInStockRef}
                defaultValue={props.data?.amountInStock}
              />
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
                amountInStock: Number(amountInStockRef?.current?.value),
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
