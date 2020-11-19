import React from 'react';
import {useLocation} from "react-router-dom";

function Enter() {
	const location = useLocation().pathname;
	let pageEnter = true;
	if(location !== "/sign-in"){ pageEnter = false} else { pageEnter = true;};
	
	return (
		<a className="header__link" href={ pageEnter ? '/sign-up' : '/sign-in' } >{ pageEnter ? 'Регистрация' : 'Вход' }</a>
	);
}

export default Enter;