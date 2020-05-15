import React, { useState } from 'react';


import SpacingGrid from '../components/Grid.js';



export default function Main() {
  const [cards, setCards] = useState([0, 1, 2]);
  const [cardData, setCardData] = useState({});

  return (
    <div className="Main">
    <SpacingGrid
    cards={cards}
     />
    </div>
  );
}
