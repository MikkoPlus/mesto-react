import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const { about, avatar, name } = useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-wrapper" onClick={props.onEditAvatar}>
          <img src={avatar} alt="Avatar" className="profile__avatar" />
        </div>
        <div className="profile__information">
          <h1 className="profile__name">{name}</h1>
          <button
            className="profile__edit-btn"
            onClick={props.onEditProfile}
          ></button>
          <h2 className="profile__job">{about}</h2>
        </div>

        <button
          className="profile__add-button"
          onClick={props.onAddCard}
        ></button>
      </section>
      <section className="places">
        <ul className="places__list">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
