import logo from '../images/icons/logo.svg';

function Header() {
    return (
        <header className="header">
          <a href="" className="header__link">
              <img src={logo} alt="Mesto Russia" className="logo" />
          </a>
        </header>
    );
}

export default Header