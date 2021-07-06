import { Grid, IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import React from "react";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";

export function EditBulkArticleDialog(props: any) {
  const formRef = React.useRef<any>();
  const amountInStockRef = React.useRef<any>();
  return (
    <div>
      <IconButton aria-label="update" onClick={props.handleBulkClickOpen}>
        <FormatListBulletedIcon />
      </IconButton>
      <Dialog
        disableBackdropClick
        open={props.openBulk}
        onClose={props.handleBulkClose}
        aria-labelledby="update-dialog-title"
      >
        <DialogTitle id="update-dialog-title">Bulk Update Article</DialogTitle>
        <DialogContent>
          <form ref={formRef}>
            {props?.bulkData?.map((d: any, index: any) => {
              return (
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      autoFocus
                      margin="dense"
                      id={"name" + index}
                      label="Name"
                      type="text"
                      defaultValue={props?.bulkData[index]?.name}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      autoFocus
                      margin="dense"
                      id={"quantity" + index}
                      label="Quantity"
                      type="number"
                      defaultValue={props?.bulkData[index]?.amountInStock}
                    />
                  </Grid>
                </Grid>
              );
            })}
          </form>{" "}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleBulkClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              console.log(formRef);
              props.handleBulkSaveClose({
                formRef,
                // id: props.data?.id,
                // name: nameRef?.current?.value,
                // amountInStock: Number(amountInStockRef?.current?.value),
              });
            }}
            color="primary"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
