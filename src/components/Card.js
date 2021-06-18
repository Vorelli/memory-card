import '../Card.css';

const Card = (props) => {
  return <div className="card" onClick={e => props.cardClicked()}>{props.id}</div>
}

export default Card;