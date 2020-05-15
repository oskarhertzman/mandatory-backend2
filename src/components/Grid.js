import React, {useState, useEffect, useRef, createRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


import { gridStyles } from '../themes/themes.js';

export default function SpacingGrid({cards}) {

  const [inputRefs, setInputRefs] = useState([]);
  const [cardName, setCardName] = useState();
  const paper = gridStyles();


  useEffect (() => {
    setInputRefs(inputRefs => (
      Array(cards.length).fill().map((_, i) => inputRefs[i] || createRef())
    ));
  }, [cards])


  function addCard (e) {
    return e.current.style.display = 'block'
  }

  function newCard () {

  }

  function newList () {

  }

  function onCardName (e) {
    setCardName(e.target.value)
  }

  console.log(inputRefs);
  return (
    <Grid container className={paper.root} spacing={2}>
      <Grid>
        <Grid container className={paper.container} justify="flex-start" spacing={3}>
          {cards.map((value, index) => (
            <Grid key={index} item>
              <Paper className={paper.paper}>
                <form onSubmit={newCard} noValidate autoComplete="off">
                  <TextField onChange={onCardName} style={{display: 'none'}} ref={inputRefs[index]} label="Name" />
                </form>
                <Button onClick={ () => addCard(inputRefs[index])} className={paper.cardButton}>Add new card</Button>
              </Paper>
            </Grid>
          ))}
          <Button className={paper.listButton}>Add new list</Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
