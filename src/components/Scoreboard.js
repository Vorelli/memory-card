const Scoreboard = (props) => {
  return <div className="scoreboard">
    <div className="score">{props.score}</div>
    <div className="header">{props.header}</div>
    <div className="hiScore">{props.hiScore}</div>
  </div>
}

export default Scoreboard;