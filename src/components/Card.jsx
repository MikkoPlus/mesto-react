import trashBagIcon from "../images/icons/trash.svg";

function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <li className="place-card">
      <img
        src={trashBagIcon}
        alt="trash-bag"
        className="place-card__trash-bag"
      />
      <img
        src={props.card.link}
        alt={props.card.name}
        className="place-card__image"
        onClick={handleClick}
      />
      <div className="place-card__footer">
        <h3 className="place-card__descr">{props.card.name}</h3>
        <div className="place-card__like">
          <button className="place-card__like-btn">
            <div className="place-card__heart"></div>
          </button>
          <div className="place-card__counter">{props.card.likes.length}</div>
        </div>
      </div>
    </li>
  );
}

export default Card;
