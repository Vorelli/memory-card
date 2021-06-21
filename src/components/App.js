import { useRef, useState } from 'react';
import '../App.css';
import Notification from './Notification';
import GameBoard from './GameBoard';
import Scoreboard from './Scoreboard';

function App() {
  const [state, setState] = useState({ text: '', numCards: 4, notificationMilliseconds: 2500, clickedCards: [] });
  const isFading = useRef(null);
  const notificationMilliseconds = 2500;

  const lose = () => {
    // lose the game. it restarts??
    setState(prev => { prev.notificationMilliseconds = 10000000; return prev; });
    setImmediate(() => setTextThenDelete('You lost the game. It has restarted.'));
    setState(prev => { prev.numCards = 4; prev.clickedCards = []; return prev; })
  }

  const win = () => {
    console.log('win called');
    // win the game. it levels up??
    //updateState({ notificationMilliseconds: 10000000 });
    setState(state => {
      state.notificationMilliseconds = 10000000;
      state.numCards += 2;
      state.clickedCards = [];
      return state;
    });
    setImmediate(() => setTextThenDelete('You won this level. You have moved to the next level.'));
  }

  const setTextThenDelete = (text) => {
    const deleteText = () => {
      isFading.current = null;
      setState(prev => { prev.text = ''; return prev; });
    };

    if (isFading.current) clearTimeout(isFading.current);
    setState(prev => { prev.text = ''; return prev; });
    setImmediate(setState(prev => { prev.text = ''; return prev; }));//(updateState.bind(this, { text }));
    isFading.current = setTimeout(deleteText, notificationMilliseconds);
  }

  const onCardClicked = (id) => {
    //updateState({ notificationMilliseconds: 2500 });
    setState(prev => { prev.notificationMilliseconds = 2500; return prev; });
    setImmediate(() => setTextThenDelete(id + ' was clicked. You didn\'t lose the game, yet!'));
    if (state.clickedCards.includes(id)) lose();
    console.log(state.clickedCards, state.numCards);
    if (state.clickedCards.length + 1 === state.numCards) {
      win();
    } else {
      setState(prevState => {
        console.log(prevState);
        prevState.clickedCards = [...prevState.clickedCards, id]
        return prevState;
      })
      //setClickedCards(clickedCards => [...clickedCards, id]);
    }
  }

  console.log(state.clickedCards);
  return <div className="app">
    <Notification time={state.notificationMilliseconds} message={state.text} />
    <GameBoard cardClicked={onCardClicked.bind(this)} numCards={state.numCards} />
    <Scoreboard score={10} hiScore={15} header={'Memory Card'} />
  </div>;
}

export default App;
