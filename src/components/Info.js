import React, { useState, useEffect, useRef } from 'react';
import Moment from 'react-moment';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CloseIcon from '@material-ui/icons/Close';

import { infoStyles, DialogContent, DialogActions, DialogTitle } from '../themes/themes.js';
import usePrevious from '../utilities/prevState';

const axios = require('axios');
const ENDPOINT = "http://localhost:8090/api";

export default function Info({data, setData, list, setList, open, setOpen, referance}) {

  const prevData = usePrevious(data)
  const [titleEdit, setTitleEdit] = useState(false);
  const [descEdit, setDescEdit] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const editTitleRef = useRef('block');
  const editDescRef = useRef('block');
  const serverRef = useRef(false);
  const info = infoStyles();

  useEffect (() => {
    let listCopy = list;
    for (let [i,cards] of listCopy.entries()) {
      if (referance === cards.uuid) {
        for (let [j,card] of cards.cards.entries()) {
          if (data.uuid === card.uuid) {
            listCopy[i].cards[j] = data;
            break;
          }
        }
      }
    }
    setList([...listCopy])
  }, [data])

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

    function handleTitleEdit () {
      editTitleRef.current = 'none';
      setTitleEdit(true);
    }


    function handleDescEdit () {
      editDescRef.current = 'none';
      setDescEdit(true);
    }


    function onTitleChange (e) {
      let value = e.target.value;
      setTitle(value);
    }


    function onDescChange (e) {
      let value = e.target.value
      setDesc(value);
    }

    function handleTitleSave () {
      editTitleRef.current = 'block';
      setTitleEdit(false);
      setData(prevState => ({ ...prevState, title: title}));
      // serverRef.current = true;
    }

    function handleDescSave () {
      editDescRef.current = 'block';
      setDescEdit(false);
      setData(prevState => ({ ...prevState, desc: desc}));
      serverRef.current = true;
    }

    function handleTitleCancel () {
      editTitleRef.current = 'block';
      setTitleEdit(false);
      setTitle(prevData.title);
      setData(prevState => ({ ...prevState, title: prevData.title}));
    }

    function handleDescCancel () {
      editDescRef.current = 'block';
      setDescEdit(false);
      setDesc(prevData.desc);
      setData(prevState => ({ ...prevState, desc: prevData.desc}));
    }

    console.log(data);

    return (
      <div>
        <Dialog
          maxWidth="lg"
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}>
          <div className={info.title}>
            {titleEdit ?
              <div className={info.titleContainer}>
                <TextField
                  onChange={onTitleChange}
                  InputProps={{ className: info.titleInput }}
                  placeholder=""
                />
                <div className={info.titleBtnGroup}>
                  <Button
                    onClick={handleTitleSave}
                    className={info.titleSave}
                    variant="contained"
                    color="primary">
                    Save
                  </Button>
                  <CloseIcon
                    onClick={handleTitleCancel}
                    className={info.titleClose}
                  />
                </div>
              </div>
              :
              <DialogTitle
                id="customized-dialog-title"
                onClose={handleClose}>
                {data.title}
              </DialogTitle>}
              <Button style={{display: editTitleRef.current}} onClick={handleTitleEdit}>Edit</Button>
            </div>
            <DialogContent
              className={info.root}
              dividers>
              <div className={info.content}>
                <div className={info.main}>
                  <div>
                    <div className={info.descTitle}>
                      <h2>Description</h2>
                      <Button style={{display: editDescRef.current}} onClick={handleDescEdit}>Edit</Button>
                    </div>
                    {descEdit ?
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
                    <div className={info.asideHeader}>
                      <div>Actions</div>
                    </div>
                    <div className={info.asideContent}>
                      <div>Move</div>
                      <div>Copy</div>
                      <div>Delete</div>
                    </div>
                  </div>
                </div>
              </DialogContent>
              <DialogActions>
                <div className={info.date}><AccessTimeIcon className={info.dateIcon} /> <Moment format="YYYY/MM/DD HH:mm">{data.date}</Moment></div>
                <Button autoFocus onClick={handleClose} color="primary">
                  Save changes
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        );
      }
