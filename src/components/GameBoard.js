import { useEffect, useState } from 'react';
import Card from './Card';
import { shuffle } from '../helpers/shuffle';

const GameBoard = (props) => {
  let [displayedCards, setCards] = useState([]);

  useEffect(() => {
    let cards = [];
    for (let i = 0; i < props.numCards; i++) {
      cards.push(
        <Card
          key={i}
          cardClicked={() => {
            setCards((c) => shuffle([...c]));
            props.cardClicked(i);
          }}
          id={i}
        />
      );
    }

    cards = shuffle(cards);
    setCards(cards);
  }, [props.numCards]);

  return <div className='gameBoard'>{displayedCards}</div>;
};

export default GameBoard;
