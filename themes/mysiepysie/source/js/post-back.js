"use strict";

( () => {
	if( shouldCloseGoBack() ) {
		document.querySelector( 'nav .close a').href = '/#aktualnosci';
	}

	function shouldCloseGoBack() {
		if( !document.referrer ) {
			return false;
		}

		const referrer = new URL( document.referrer );
		
		if( referrer.host != window.location.host ) {
			return false;
		}

		return referrer.pathname == '/';
	}
} )();
