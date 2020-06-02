import React, { useState, useEffect, useRef, createRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';

import Info from '../components/Info.js';
import DeleteDialog from '../components/DeleteList.js';
import { gridStyles } from '../themes/themes.js';

const axios = require('axios');
const ENDPOINT = "http://localhost:8090/api";

export default function SpacingGrid({cards}) {


  const [cardRefs, setCardRefs] = useState([]);
  const [inputRefs, setInputRefs] = useState([]);
  const [serverRef, setServerRef] = useState(false);
  const [list, setList] = useState(cards);
  const [listDel, setListDel] = useState();
  const [listName, setListName] = useState();
  const [cardName, setCardName] = useState();
  const [cardData, setCardData] = useState();
  const [referance, setReferance] = useState();
  const [open, setOpen] = useState(false);
  const paper = gridStyles();
  const [openInfo, setOpenInfo] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);


  // Effects

  useEffect (() => {
    setInputRefs(inputRefs => (
      Array(list.length).fill().map((_, i) => inputRefs[i] || createRef())
    ));
    setCardRefs(cardRefs => (
      Array(list.length).fill().map((_, i) => cardRefs[i] || createRef())
    ));
  }, [list])

  useEffect (() => {
    if (serverRef) {
      console.log(list);
      let data = JSON.stringify({
        data: list
      });
      axios.post(ENDPOINT, data, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }})
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        })
        setServerRef(false);
      }
    }, [list, serverRef])

  // Prop Listeners

    function onListName (e) {
      setListName(e.target.value);
    }

    function onCardName (e) {
      setCardName(e.target.value)
    }

  // Handlers

    function handleAddCard (inputRef) {
      return inputRef.current.style.visibility = 'visible';
    }

    function handleNewCard (e, cardRef) {
      let title = e.target.value;
      let id = cardRef.current.id;
      let listCopy = list;
      for (let [index,card] of list.entries()) {
        if (card.uuid === id) {
          card.cards.push({title: title, desc: '', date: new Date(), uuid: uuidv4()})
          listCopy.splice(index, card)
          break;
        }
      }
      setList([...listCopy])
      setServerRef(true);
    }

    function handleNewList () {
      setOpen(true);
    }

    function handleConfirm () {
      setList(prevState => [...prevState, {list: listName, uuid: uuidv4(), cards:[]}]);
      setListName('');
      setServerRef(true);
      setOpen(false);
    }

    function handleCancel () {
      setOpen(false);
    };


    function handleCardInfo (card, referance) {
      setCardData(card);
      setReferance(referance);
      setOpenInfo(true);
    }


    function handleDeleteList (selList) {
      setListDel(selList);
      setOpenDelete(true);
    }


    return (
      <>
      <Grid container className={paper.root} spacing={2}>
        <Grid>
          <Grid container className={paper.container} justify="flex-start" spacing={3}>
            {list.map((listItem, index) => (
              <Grid key={index} ref={cardRefs[index]} id={listItem.uuid} item>
                <Paper className={paper.paper}>
                  <p>{listItem.list}</p>
                  <div className={paper.cards}>
                    {listItem.cards.map((card, index) => (
                      <Paper elevation={1} className={paper.card} key={index}>
                        <Button onClick={ () => handleCardInfo(card, listItem)} className={paper.cardButton}>{card.title}</Button>
                      </Paper>
                    ))}
                  </div>
                  <form onSubmit={handleNewCard} noValidate autoComplete="off">
                    <TextField
                      onChange={onCardName}
                      className={paper.inputName}
                      ref={inputRefs[index]}
                      label="Name"
                      onKeyPress={(ev) => {
                        if (ev.key === 'Enter') {
                          ev.preventDefault();
                          handleNewCard(ev, cardRefs[index]);
                        }
                      }} />
                    </form>
                    <div className={paper.options}>
                      <Button
                        onClick={ () => handleAddCard(inputRefs[index])}
                        className={paper.addCard}>
                        Add new card
                      </Button>
                      <DeleteIcon
                        className={paper.deleteList}
                        onClick={() => handleDeleteList(listItem)}
                      />
                    </div>
                  </Paper>
                </Grid>
              ))}
              <Button onClick={handleNewList} className={paper.listButton}>Add new list</Button>
            </Grid>
          </Grid>
        </Grid>
        <Dialog open={open} onClose={handleCancel || handleConfirm} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">New list</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Give your list a productive title that represents it's context.
            </DialogContentText>
            <TextField
              onChange={onListName}
              autoFocus
              margin="dense"
              id="name"
              label="Title"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirm} color="primary">
              Enter
            </Button>
          </DialogActions>
        </Dialog>
        {openInfo ?
          <Info
            data={cardData}
            setData={setCardData}
            list={list}
            setList={setList}
            open={openInfo}
            setOpen={setOpenInfo}
            referance={referance}
            postRef={serverRef}
            setPostRef={setServerRef}
          /> :
          null }
          {openDelete ?
            <DeleteDialog
            list={list}
            setList={setList}
            target={listDel}
            open={openDelete}
            setOpen={setOpenDelete}
            /> :
            null }
          </>
        );
      }
