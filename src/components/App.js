import { useRef, useState } from 'react';
import '../App.css';
import Notification from './Notification';
import GameBoard from './GameBoard';
import Scoreboard from './Scoreboard';

function App() {
  const [state, setState] = useState({ text: '', numCards: 4 });
  const [clickedCards, setClickedCards] = useState([]);
  const isFading = useRef(null);
  const notificationMilliseconds = 2500;

  const updateState = (update) => {
    setState(prevState => { return { ...prevState, ...update } });
  }

  const lose = () => {
    // lose the game. it restarts??
  }

  const win = () => {
    // win the game. it levels up??
  }

  const setTextThenDelete = (text) => {
    const deleteText = () => {
      isFading.current = null;
      updateState({ text: '' });
    };

    if (isFading.current) clearTimeout(isFading.current);
    updateState({ text: '' });
    setImmediate(updateState.bind(this, { text }));
    isFading.current = setTimeout(deleteText, notificationMilliseconds);
  }

  const cardClicked = (id) => {
    setTextThenDelete(id + ' was clicked')
    if (clickedCards.includes(id)) lose();
    else {
      setClickedCards(clicked => { clicked.push(id); return clicked })
    }
  }

  return <div className="app">
    <input type="text" value={state.text} onChange={(e) => updateState({ text: e.target.value })} />
    <Notification time={notificationMilliseconds} message={state.text} />
    <GameBoard cardClicked={(id) => cardClicked(id)} numCards={state.numCards} />
    <Scoreboard score={10} hiScore={15} header={'Memory Card'} />
  </div>;
}

export default App;
