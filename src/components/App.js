import { useState } from 'react';
import '../App.css';
import Notification from './Notification';

function App() {
  const [text, setText] = useState('');

  return <div className="app">
    <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
    <Notification message={text} />
  </div>;
}

export default App;
