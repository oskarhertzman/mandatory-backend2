import React, {useState, useEffect, useRef, createRef} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { gridStyles } from '../themes/themes.js';

const axios = require('axios');
const ENDPOINT = "http://localhost:8090/api";

export default function SpacingGrid({cards}) {

  const [inputRefs, setInputRefs] = useState([]);
  const [serverRef, setServerRef] = useState(false);
  const [list, setList] = useState(cards);
  const [listName, setListName] = useState();
  const [cardName, setCardName] = useState();
  const [cardDesc, setCardDesc] = useState();
  const [cardDate, setCardDate] = useState();
  const [open, setOpen] = React.useState(false);
  const paper = gridStyles();



  useEffect (() => {
    console.log("hej");
    setInputRefs(inputRefs => (
      Array(list.length).fill().map((_, i) => inputRefs[i] || createRef())
    ));
    if (serverRef) {
      let data = JSON.stringify({
        data: list
      });
      console.log(data);
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
    }
  }, [list, serverRef])


  function addCard (e) {
    return e.current.style.visibility = 'visible';
  }

  function newCard (e) {
    console.log(e.target.value);
  }

  function newList () {
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

  function onListName (e) {
    setListName(e.target.value);
  }



  function onCardName (e) {
    setCardName(e.target.value)
  }




console.log(list);

  return (
    <>
    <Grid container className={paper.root} spacing={2}>
      <Grid>
        <Grid container className={paper.container} justify="flex-start" spacing={3}>
          {list.map((value, index) => (
            <Grid key={index} item>
              <Paper className={paper.paper}>
                <p>{value.list}</p>
                <form onSubmit={newCard} noValidate autoComplete="off">
                  <TextField
                    onChange={onCardName}
                    className={paper.inputName}
                    ref={inputRefs[index]}
                    label="Name"
                    onKeyPress={(ev) => {
                      if (ev.key === 'Enter') {
                        ev.preventDefault();
                        newCard(ev);
                      }
                    }} />
                </form>
                <Button onClick={ () => addCard(inputRefs[index])} className={paper.cardButton}>Add new card</Button>
              </Paper>
            </Grid>
          ))}
          <Button onClick={newList} className={paper.listButton}>Add new list</Button>
        </Grid>
      </Grid>
    </Grid>
    <Dialog open={open} onClose={handleCancel || handleConfirm} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">New list</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Give your list a productive title that represents it's future context.
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
  </>
);
}
