import '../Card.css';

const Card = (props) => {
  return <div className="card" onClick={e => { e.preventDefault(); props.cardClicked() }}><span>{props.id}</span></div>
}

export default Card;