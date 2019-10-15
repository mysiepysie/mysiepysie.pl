"use strict";

( () => {
	const form = document.querySelector( 'section.contact .form form' );
	const nameInput = form.querySelector( '#name' );
	const emailInput = form.querySelector( '#email' );
	const messageTextarea = form.querySelector( '#message' );
	const submitButton = form.querySelector( 'button[type=submit]' );

	form.addEventListener( 'submit', submit );
	submitButton.addEventListener( 'click', validate );

	submitButton.addEventListener( 'animationend', () => {
		submitButton.classList.remove( 'animate' );
	} );

	function validate( evt ) {
		if( submitButton.classList.contains( 'animate' ) 
			|| submitButton.classList.contains( 'sending' )
			|| submitButton.classList.contains( 'success' )
			|| submitButton.classList.contains( 'error' ) ) {
			evt.preventDefault();
			return;
		}

		if( !form.checkValidity() ) {
			submitButton.classList.add( 'animate' );
		}
	}

	async function submit( evt ) {
		evt.preventDefault();

		submitButton.innerHTML = '<img src="images/tail_spin.svg" alt="Loader">';
		submitButton.classList.add( 'sending' );
		submitButton.disabled = true;

		const name = nameInput.value;
		const email = emailInput.value;
		const message = messageTextarea.value.replace( /\n/g, '<br>' );

		try {
			const token = await grecaptcha.execute( '6LdeybwUAAAAAG3V_ucEe6pfXFSNvH5XIgbdBLmw', {action: 'homepage'} );
			const response = await send( 'https://mailer.jasiun.pl', { name, email, message, token } );

			if( response.status == 'success' ) {
				submitButton.innerHTML = '<span></span><span></span>';
				submitButton.classList.remove( 'sending' );
				submitButton.classList.add( 'success' );
			} else {
				throw 'Response incorrect';
			}
		} catch( err ) {
			console.error( err );

			submitButton.innerHTML = '<span></span><span></span><span>Coś poszło nie tak...</span>';
			submitButton.classList.remove( 'sending' );
			submitButton.classList.add( 'error' );
		}

	}

	async function send( url, data ) {
		const response = await fetch( url, {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
			  'Content-Type': 'application/json'
			},
			referrer: 'no-referrer',
			body: JSON.stringify( data )
		} );

		return await response.json();
	}
} )();
