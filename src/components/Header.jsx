import React from 'react';
import logoMesto from '../images/logo.svg';

/**{loggedIn ? <UserInfo / > : <NavReg />} */
function Header({loggedIn}) {
	return (
		<header className="header">
		<img src={logoMesto} className="header__logo" alt="Место" />
			
		<a className="header__link" href="/sign-up">Регистрация</a>

		</header>
	);
}

export default Header;
