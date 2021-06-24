const Scoreboard = (props) => {
  return (
    <div className='scoreboard'>
      <div className='score'>Score: {props.score}</div>
      <div className='header'>{props.header}</div>
      <div className='hiScore'>Hi Score: {props.hiScore}</div>
    </div>
  );
};

export default Scoreboard;
