import React from 'react';
import logoMesto from '../images/logo.svg';

function Header() {
	return (
		<header className="header">
		<img src={logoMesto} className="header__logo" alt="Место" />
		</header>
	);
}

export default Header;
