import logo from '../images/logo.svg';
const logoImg = logo;

export function Header() {
    return (
        <header className="header">
            <img src={logoImg} alt="Логотип Место" className="header__logo"/>
        </header>
    )
}