import React from 'react';
import Card from './Card';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup'
import Input from './Input';
import api from '../utils/Api';

function Main(props) {

    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api.getProfileData().then(data => {
                const {name, about, avatar} = data
                
                setUserName(name);
                setUserDescription(about);
                setUserAvatar(avatar);
            })
            .catch(err => console.log(err))

        api.getCards()
            .then(data => {
                setCards(data.map(item => {
                    return {
                        name: item.name,
                        id: item._id,
                        link: item.link,
                        likes: item.likes
                    }
                }));
            })
            .catch(err => console.log(err))


    }, [])
    return (
    <main className="content">
        <section className="profile">
            <div className="profile__avatar-wrapper" onClick={props.onEditAvatar}>
                <img src={userAvatar} alt="Avatar" className="profile__avatar" />
            </div>
            <div className="profile__information">
                <h1 className="profile__name">{userName}</h1>
                <button className="profile__edit-btn" onClick={props.onEditProfile}></button>
                <h2 className="profile__job">{userDescription}</h2>
            </div>

            <button className="profile__add-button" onClick={props.onAddCard}></button>
        </section>
        <section className="places">
            <ul className="places__list">
                {cards.map((card) => (
                    <Card key={card.id} card={card} onCardClick={props.onCardClick} />
                ))}
            </ul>
        </section>
        <section className="popups">
            <PopupWithForm name="edit-avatar" title="Обновить аватар" btnText="Обновить" onClose={props.closeAllPopups} isOpen={props.isEditAvatarPopupOpen}>
                <Input id="avatar-url" type="url" placeholder="Ссылка на аватар" name="avatar" />
            </PopupWithForm>

            <PopupWithForm name="edit-profile" title="Редактировать профиль" btnText="Сохранить" onClose={props.closeAllPopups} isOpen={props.isEditProfilePopupOpen}>
                
                <Input id="profile-name" type="text" placeholder="Введите имя" name="name" minLength="2" maxLength="20" />
                <Input id="profile-job" type="text" placeholder="Введите занятие" name="about" minLength="2" maxLength="200" />

            </PopupWithForm>

            <PopupWithForm name="add-card" title="Новое место" btnText="Создать" onClose={props.closeAllPopups} isOpen={props.isAddPlacePopupOpen}>
                <Input id="card-name" type="text" placeholder="Название" name="name" minLength="2" maxLength="30" />
                <Input id="card-link" type="url" placeholder="Ссылка на картинку" name="link" minLength="2" maxLength="30" />

            </PopupWithForm>
            <PopupWithForm name="delete-card" title="Вы уверены?" btnText="Да" onClose={props.closeAllPopups} />
            
            <ImagePopup card={props.card} onClose={props.closeAllPopups} isOpen={props.isImagePopupOpen}/>
          </section>
      </main>
    );
}

export default Main;