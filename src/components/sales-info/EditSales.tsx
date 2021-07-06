import { Grid, IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { Add, Delete, DeleteOutline } from "@material-ui/icons";
import React from "react";

export function EditSalesDialog(props: any) {
  const productIdRef = React.useRef<any>();
  const amountSoldRef = React.useRef<any>();
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
          {props.data.id ? "Edit Sales" : "Add New Sales"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                id="productId"
                label="Product Id"
                type="text"
                inputRef={productIdRef}
                defaultValue={props.data?.productId}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                id={"amountSold"}
                label="Amount Sold"
                type="number"
                inputRef={amountSoldRef}
                defaultValue={props.data?.amountSold}
              />
            </Grid>
          </Grid>{" "}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              props.handleSaveClose({
                id: props.data.id,
                productId: productIdRef?.current?.value,
                amountSold: amountSoldRef?.current?.value,
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
