import React from 'react';

function Form ({name,title, onSubmit, children, submitText, onClose}) {
	return(
				<form name={`form_type_${name}`} className='form form_type_login' noValidate onSubmit={onSubmit}>
						<div className="form__edit form__edit_theme_dark">
							<h2 className="form__title form__title_theme_dark">{title}</h2>
							{children}
							<input type="submit" value={submitText} className="form__submit form__submit_theme_dark"></input>
						</div>
				</form>
	)
}

export default Form;
