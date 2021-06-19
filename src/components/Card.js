import '../Card.css';

const Card = (props) => {
  return <div className="card" onClick={e => props.cardClicked()}><span>{props.id}</span></div>
}

export default Card;