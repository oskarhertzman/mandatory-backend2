import React, { useState, useEffect, useRef, createRef } from 'react';
import Moment from 'react-moment';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import Popover from '@material-ui/core/Popover';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CloseIcon from '@material-ui/icons/Close';
import RepeatIcon from '@material-ui/icons/Repeat';
import ClearIcon from '@material-ui/icons/Clear';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';


import { infoStyles, DialogContent, DialogSave, DialogTitle } from '../themes/themes.js';
import usePrevious from '../utilities/prevState';

const axios = require('axios');
const ENDPOINT = "http://localhost:8090/api";

export default function Info({data, setData, list, setList, open, setOpen, referance, postRef, setPostRef}) {


  const prevData = usePrevious(data)
  const [titleEdit, setTitleEdit] = useState(false);
  const [descEdit, setDescEdit] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [disablePos, setDisablePos] = useState(true);
  const [selectedList, setSelectedList] = useState({cards: []});
  const [selectedPos, setSelectedPos] = useState('');
  const editTitleRef = useRef('block');
  const editDescRef = useRef('block');
  const popupRef = useRef('');
  const serverRef = useRef(false);
  const info = infoStyles();

  const openAction = Boolean(anchorEl);
  const idAction = open ? 'simple-popover' : undefined;

  // Effects

  useEffect (() => {
    let listCopy = list;
    for (let [i,cards] of listCopy.entries()) {
      if (referance.uuid === cards.uuid) {
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
        referance: referance.uuid,
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
    }, [data, serverRef, referance.uuid])


    // Prop Listeners

    function onTitleChange (e) {
      let value = e.target.value;
      setTitle(value);
    }

    function onDescChange (e) {
      let value = e.target.value
      setDesc(value);
    }

    function onMove (e) {
      popupRef.current = 'move';
      setAnchorEl(e.currentTarget);
    }

    function onCopy (e) {
      popupRef.current = 'copy';
      setAnchorEl(e.currentTarget);
    }

    function onDelete (e) {
      popupRef.current = 'delete';
      setAnchorEl(e.currentTarget);
    }

    function onSelectList (e) {
      let selected = e.target.value;
      let listCopy = list;
      for (let [i,cards] of listCopy.entries()) {
        if (selected === cards.uuid) {
          setSelectedList(cards);
        }
      }
      setDisablePos(false);
    }

    function onSelectPos (e) {
      let selected = e.target.value;
      setSelectedPos(selected);
    }

    // Handlers

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

    function handleTitleSave () {
      editTitleRef.current = 'block';
      setTitleEdit(false);
      setData(prevState => ({ ...prevState, title: title}));
      serverRef.current = true;
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

    function handleClosePop () {
      setAnchorEl(null);
    }

    function handleMove (selList, selPos) {
      if (selList.cards.length > 0 && selPos) {
        for (let [index, cards] of referance.cards.entries()) {
          if (data.uuid === cards.uuid) {
            referance.cards.splice(index, 1);
            break;
          }
        }
        selList.cards.splice(selPos, 0, data)
        setPostRef(true);
        setOpen(false);
      }
    }

    function handleCopy (selList, selPos) {
      if (selList.cards.length > 0 && selPos) {
        selList.cards.splice(selPos, 0, data);
        setPostRef(true);
        setOpen(false);
      }
    }

    function handleDelete () {
      for (let [index, cards] of referance.cards.entries()) {
        if (data.uuid === cards.uuid) {
          referance.cards.splice(index, 1);
          break;
        }
      }
      setPostRef(true);
      setOpen(false);
    }

    return (
      <div>
        <Dialog
          maxWidth="md"
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
                    </div>
                  </div>
                  <div className={info.aside}>
                    <div className={info.asideHeader}>
                      <div className={info.asideTitle}>Actions</div>
                    </div>
                    <div className={info.asideContent}>
                      <div onClick={onMove}><SwapHorizIcon />Move</div>
                      <div onClick={onCopy}><RepeatIcon />Copy</div>
                      <div onClick={onDelete}><ClearIcon />Delete</div>
                    </div>
                  </div>
                  <div className={info.asideAction}>
                    <Popover
                      id={idAction}
                      open={openAction}
                      anchorEl={anchorEl}
                      onClose={handleClosePop}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                      }}
                      >{popupRef.current === 'move' ?
                      <Typography className={info.actionContent}>
                        <div className={info.actionHeader}>
                          Move Card
                        </div>
                        <div className={info.actionBody}>
                          <p>Path</p>
                          <FormControl>
                            <InputLabel htmlFor="demo-customized-select-native">List</InputLabel>
                            <NativeSelect
                              id="demo-customized-select-native"
                              onChange={onSelectList}
                              required
                              >
                                <option aria-label="None" value="" />
                                {list.map((listName, index) => (
                                  listName.uuid !== referance.uuid ?
                                  <option key={index} value={listName.uuid}>{listName.list}</option> :
                                  null
                                ))}
                              </NativeSelect>
                            </FormControl>
                            <FormControl >
                              <InputLabel htmlFor="demo-customized-select-native">Position</InputLabel>
                              <NativeSelect
                                required
                                id="demo-customized-select-native"
                                onChange={onSelectPos}
                                disabled={disablePos}
                                >
                                  <option aria-label="None" value="" />
                                  {selectedList.cards.map((listPos, index) => (
                                    <option key={index} value={index + 1}>{index + 1}</option>
                                  ))}
                                </NativeSelect>
                              </FormControl>
                              <Button
                                onClick={() => handleMove(selectedList, selectedPos)}
                                className={info.actionSubmit}
                                variant="contained"
                                color="secondary">
                                Move
                              </Button>
                            </div>
                          </Typography> : null}

                          {popupRef.current === 'copy' ?
                          <Typography className={info.actionContent}>
                            <div className={info.actionHeader}>
                              Copy Card
                            </div>
                            <div className={info.actionBody}>
                              <p>Path</p>
                              <FormControl>
                                <InputLabel htmlFor="demo-customized-select-native">List</InputLabel>
                                <NativeSelect
                                  id="demo-customized-select-native"
                                  onChange={onSelectList}
                                  required
                                  >
                                    <option aria-label="None" value="" />
                                    {list.map((listName, index) => (
                                      listName.uuid !== referance.uuid ?
                                      <option key={index} value={listName.uuid}>{listName.list}</option> :
                                      null
                                    ))}
                                  </NativeSelect>
                                </FormControl>
                                <FormControl >
                                  <InputLabel htmlFor="demo-customized-select-native">Position</InputLabel>
                                  <NativeSelect
                                    required
                                    id="demo-customized-select-native"
                                    onChange={onSelectPos}
                                    disabled={disablePos}
                                    >
                                      <option aria-label="None" value="" />
                                      {selectedList.cards.map((listPos, index) => (
                                        <option key={index} value={index + 1}>{index + 1}</option>
                                      ))}
                                    </NativeSelect>
                                  </FormControl>
                                  <Button
                                    onClick={() => handleCopy(selectedList, selectedPos)}
                                    className={info.actionSubmit}
                                    variant="contained"
                                    color="secondary">
                                    Move
                                  </Button>
                                </div>
                              </Typography>
                              : null}

                              {popupRef.current === 'delete' ?
                              <Typography className={info.actionContent}>
                                <div className={info.actionHeader}>
                                  Delete Card
                                </div>
                                <div className={info.actionBody}>
                                  <p>Are you sure you want to delete {data.title} ?</p>
                                  <Button
                                    onClick={() => handleDelete()}
                                    className={info.actionSubmit}
                                    variant="contained"
                                    color="secondary">
                                    Delete
                                  </Button>
                                </div>
                              </Typography>
                              : null}
                            </Popover>
                          </div>
                        </div>
                      </DialogContent>
                      <DialogSave>
                        <div className={info.date}><AccessTimeIcon className={info.dateIcon} /> <Moment format="YYYY/MM/DD HH:mm">{data.date}</Moment></div>
                        <Button autoFocus onClick={handleClose} color="primary">
                          Close
                        </Button>
                      </DialogSave>
                    </Dialog>
                  </div>
                );
              }
