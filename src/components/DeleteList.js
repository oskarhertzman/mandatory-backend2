import React, { useState, useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const axios = require('axios');
const ENDPOINT = "http://localhost:8090/api/";

export default function DeleteDialog({list, setList, target, open, setOpen}) {






  function handleCancel () {
    setOpen(false);
  };

  function handleConfirm () {

    const url = ENDPOINT + `:${target.uuid}`;
    console.log(url)
    axios.delete(url)
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.log(err);
    })


    let listCopy = list;
    for (let [index,item] of list.entries()) {
      if (target.uuid === item.uuid) {
        listCopy.splice(index, 1);
        break;
      }
    }
    setList([...listCopy]);
    setOpen(false);
  }

  return (
    <div>
      <Dialog open={open} onClose={handleCancel || handleConfirm} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Do you really want to delete {target.list} ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);
}
