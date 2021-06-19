import { useEffect, useState } from "react";
import Card from "./Card";

function shuffle(array) {// taken from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  var currentIndex = array.length, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}


const GameBoard = (props) => {
  let [displayedCards, setCards] = useState([]);

  const shuff = () => {
    setCards(c => shuffle([...c]))
  }

  useEffect(() => {
    let cards = [];
    for (let i = 0; i < props.numCards; i++) {
      cards.push(<Card key={i} cardClicked={() => { shuff(); props.cardClicked(i) }} id={i} />)
    }

    cards = shuffle(cards)
    setCards(cards);
  }, [props.numCards])

  return <div className="gameBoard">{displayedCards}</div>
}

export default GameBoard;