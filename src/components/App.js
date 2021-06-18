import { useRef, useState } from 'react';
import '../App.css';
import Notification from './Notification';
import Card from './Card';

function App() {
  const [text, setText] = useState('');
  const isFading = useRef(null);
  const notificationMilliseconds = 2500;

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

  return <div className="app">
    <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
    <Notification time={notificationMilliseconds} message={text} />
    <Card cardClicked={() => setTextThenDelete('0 was clicked')} id={0} />
  </div>;
}

export default App;
