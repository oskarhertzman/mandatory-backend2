import React, { useState, useEffect } from 'react';

import SpacingGrid from '../components/Grid.js';
import '../styles/Main.scss';


const axios = require('axios');
const ENDPOINT = "http://localhost:8090/api";


export default function Main() {
  const [cards, setCards] = useState()
  const [cardData, setCardData] = useState({});


  useEffect(() => {
    axios.get(ENDPOINT)
    .then((response) => {
      console.log(response);
      setCards(response.data.data)
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])


  return (
    <div className="Main">
      {cards ?
        <SpacingGrid
        cards={cards}
      /> : null }
    </div>
  );
}
