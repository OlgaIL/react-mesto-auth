import React from 'react';
import logoMesto from '../images/logo.svg';
import Profile from './Profile';
import Enter from './Enter';

/**{loggedIn ? <UserInfo / > : <NavReg />} */
function Header({loggedIn, userData, onLogOut}) {
	return (
		<header className="header">
			<img src={logoMesto} className="header__logo" alt="Место" />
			{ loggedIn ? <Profile onLogOut={onLogOut}  userData={userData} /> : <Enter /> }
		</header>
	);
}

export default Header;
