import React from 'react';
import {useLocation} from "react-router-dom";

function Enter() {
	const location = useLocation().pathname;
	let enter = true;
	if(location !== "/sign-in"){ enter = false} else { enter = true;};
	
	return (
		<a className="header__link" href={enter ? '/sign-up' : '/sign-in' } >{ enter ? 'Регистрация' : 'Вход' }</a>
	);
}

export default Enter;