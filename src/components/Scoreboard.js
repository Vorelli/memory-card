import '../styles/Scoreboard.css';

const Scoreboard = (props) => {
  return (
    <div className='scoreboard'>
      <span className='score'>Score: {props.score}</span>
      <span className='header'>{props.header}</span>
      <span className='hiScore'>Hi Score: {props.hiScore}</span>
    </div>
  );
};

export default Scoreboard;
