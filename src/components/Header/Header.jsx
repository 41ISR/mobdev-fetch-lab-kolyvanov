import { Link, NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
  const getLinkClass = ({ isActive }) =>
    isActive ? 'header__nav-link header__nav-link--active' : 'header__nav-link';

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="header__logo">
          <span className="header__logo-mark">OMDb</span>
          <span className="header__logo-sub">кинокаталог</span>
        </Link>

        <nav className="header__nav">
          <NavLink to="/" end className={getLinkClass}>
            Главная
          </NavLink>
          <NavLink to="/about" className={getLinkClass}>
            О проекте
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;