import React, { useState, useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

import { infoStyles, DialogContent, DialogActions, DialogTitle } from '../themes/themes.js';
import usePrevious from '../utilities/prevState';

const axios = require('axios');
const ENDPOINT = "http://localhost:8090/api";

export default function Info({data, setData, open, setOpen, referance}) {

  const prevData = usePrevious(data)
  const [edit, setEdit] = useState(false);
  const [desc, setDesc] = useState('');
  const serverRef = useRef(false);
  const info = infoStyles();

  useEffect(() => {

    if (serverRef.current) {
      serverRef.current = false;
      let JSONdata = JSON.stringify({
        data: data,
        referance: referance,
      });
      axios.put(ENDPOINT, JSONdata, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }})
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        })
    }
  }, [data, serverRef])


  function handleClose () {
    setOpen(false);
  };

  function handleEdit () {
    setEdit(true);
  }

  function onDescChange (e) {
    let value = e.target.value
    setDesc(value);

  }

  function handleDescSave () {
    setEdit(false);
    setData(prevState => ({ ...prevState, desc: desc}));
    serverRef.current = true;
  }

  function handleDescCancel () {
    setEdit(false);
    setDesc(prevData.desc);
    setData(prevState => ({ ...prevState, desc: prevData.desc}));
  }


  return (
    <div>
      <Dialog
        maxWidth="lg"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}>
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleClose}>
          {data.title}
        </DialogTitle>
        <DialogContent
          className={info.root}
          dividers>
          <div className={info.content}>
            <div className={info.main}>
              <div>
                <div className={info.descTitle}>
                  <h2>Description</h2>
                  <Button onClick={handleEdit}>Edit</Button>
                </div>
                {edit ?
                  <div className={info.descContainer}>
                    <TextField
                      onChange={onDescChange}
                      className={info.descInput}
                      value={desc}
                      placeholder=""
                      multiline
                      rows={2}
                      rowsMax={5}
                    />
                    <div className={info.descBtnGroup}>
                      <Button
                        onClick={handleDescSave}
                        className={info.descSave}
                        variant="contained"
                        color="primary">
                        Save
                      </Button>
                      <CloseIcon
                        onClick={handleDescCancel}
                        className={info.descClose}
                      />
                    </div>
                  </div>
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
