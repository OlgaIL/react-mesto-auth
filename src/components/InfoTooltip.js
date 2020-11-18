import React from 'react';

function InfoTooltip (props) {
	return(
			<div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
				<div className="popup__container">
					<div className="form__edit">
							<h2 className="form__title">{props.title}</h2>
							{props.children}
				
					</div>
					<button type="button" className="form__close" title="Закрыть" onClick={props.onClose}></button>
				</div>
			</div>
	)
}

export default InfoTooltip;
