import { useRef, useState } from 'react';
import '../App.css';
import Notification from './Notification';
import GameBoard from './GameBoard';

function App() {
  const [text, setText] = useState('');
  const isFading = useRef(null);
  const notificationMilliseconds = 2500;
  const [numCards, setNumCards] = useState(4);
  const [clickedCards, setClickedCards] = useState([]);

  const setTextThenDelete = (text) => {
    const deleteText = () => {
      isFading.current = null;
      setText('')
    };

    if (isFading.current) clearTimeout(isFading.current);
    setText('');
    setImmediate(setText.bind(this, text));
    isFading.current = setTimeout(deleteText, notificationMilliseconds);
  }

  const cardClicked = (id) => {
    setTextThenDelete(id + ' was clicked')
    if (clickedCards.includes(id)) console.log('fail');
    else {
      setClickedCards(clicked => { clicked.push(id); return clicked })
    }
  }

  return <div className="app">
    <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
    <Notification time={notificationMilliseconds} message={text} />
    <GameBoard cardClicked={(id) => cardClicked(id)} numCards={numCards} />
  </div>;
}

export default App;
