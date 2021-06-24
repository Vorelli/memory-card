import { useEffect, useState } from 'react';
import Card from './Card';
import shuffle from '../helpers/shuffle';

const GameBoard = (props) => {
  const { numCards, cardClicked } = props;
  let [displayedCards, setCards] = useState([]);

  useEffect(() => {
    let cards = [];
    for (let i = 0; i < numCards; i++) {
      cards.push(
        <Card
          key={i}
          cardClicked={() => {
            setCards((c) => shuffle([...c]));
            cardClicked(i);
          }}
          id={i}
        />
      );
    }

    cards = shuffle(cards);
    setCards(cards);
  }, [numCards, cardClicked]);

  return <div className='gameBoard'>{displayedCards}</div>;
};

export default GameBoard;
