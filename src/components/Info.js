import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Typography from '@material-ui/core/Typography';

import { infoStyles, DialogContent, DialogActions, DialogTitle } from '../themes/themes.js';

export default function Info({data, open, setOpen}) {

  const [edit, setEdit] = useState(false);
  const info = infoStyles();

  useEffect(() => {
    console.log(data);
  }, [])


  function handleClose () {
    setOpen(false);
  };

  function handleEdit () {
    setEdit(true);
  }

  return (
    <div>
      <Dialog maxWidth="lg" className={info.root} onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {data.title}
        </DialogTitle>
        <DialogContent dividers>
          <div className={info.content}>
            <div className={info.main}>

              <div>
                <div className={info.desc}>
                  <h2>Description</h2>
                  <Button onClick={handleEdit}>Edit</Button>
                </div>
                {edit ?
                  <TextareaAutosize aria-label="empty textarea" placeholder="Empty">

                  </TextareaAutosize>
                   :
                  <Typography gutterBottom>
                    {data.desc}
                  </Typography> }

                </div>
                <div>
                  <h2>Date</h2>
                </div>
              </div>
              <div className={info.aside}>
                <div>Actions</div>

              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              Save changes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
