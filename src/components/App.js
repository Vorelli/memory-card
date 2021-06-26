import { useEffect, useRef, useState } from 'react';
import '../styles/App.css';
import Notification from './Notification';
import GameBoard from './GameBoard';
import Scoreboard from './Scoreboard';

function App() {
  const [notificationText, setNotificationText] = useState('');
  const [numCards, setNumCards] = useState();
  const correctCards = useRef();
  const isFading = useRef(null);
  const notificationMilliseconds = 5000;
  const [scores, setScores] = useState({ score: 0, hiScore: 0 });
  useEffect(() => {
    restart();
    loadHiScore();
  }, []); // restart (start?) at start (restart?)

  const loadHiScore = () => {
    const hiScore = Number.parseInt(localStorage.getItem('hiScore'));
    if (hiScore) {
      setScores((scores) => {
        scores.hiScore = hiScore;
        return scores;
      });
    }
  };

  const restart = () => {
    // could possibly be called start
    // but i guess in one form or another
    // it is restarting because it's been
    // started once before in this world
    setNumCards(4);
    correctCards.current = [];
    setScores((scores) => {
      return { score: 0, hiScore: scores.hiScore };
    });
  };

  const lose = () => {
    // lose the game. it restarts??
    // but not before letting the player know they lost
    setTextThenClear(
      'You lost the game. It has restarted. Try to beat your high score!'
    );
    restart();
  };

  const levelUp = () => {
    // win the game. it levels up??
    setNumCards((numCards) => numCards + 2); // level up
    correctCards.current = []; // restart the 'game'
    setTextThenClear('You won this level. You have moved to the next level.');
    // notify player
  };

  const clearText = () => {
    isFading.current = null;
    setNotificationText('');
  };

  const setTextThenClear = (text) => {
    if (isFading.current) clearTimeout(isFading.current);
    setNotificationText('');
    setImmediate(setNotificationText.bind(this, text));
    isFading.current = setTimeout(clearText, notificationMilliseconds);
  };

  const onCardClicked = (id) => {
    setTextThenClear(id + " was clicked. You didn't lose the game, yet!");

    if (correctCards.current.includes(id)) return lose();

    incrementScore();
    if (correctCards.current.length + 1 === numCards) {
      levelUp();
    } else {
      correctCards.current = [...correctCards.current, id];
    }
  };

  const incrementScore = () => {
    setScores((scores) => {
      if (scores.score === scores.hiScore) {
        localStorage.setItem('hiScore', scores.hiScore + 1);
        return { score: scores.score + 1, hiScore: scores.hiScore + 1 };
      }
      return { score: scores.score + 1, hiScore: scores.hiScore };
    });
  };

  return (
    <div className='app'>
      <Notification
        time={notificationMilliseconds}
        message={notificationText}
      />
      <GameBoard cardClicked={(id) => onCardClicked(id)} numCards={numCards} />
      <Scoreboard
        score={scores.score}
        hiScore={scores.hiScore}
        header={'Memory Card'}
      />
    </div>
  );
}

export default App;
