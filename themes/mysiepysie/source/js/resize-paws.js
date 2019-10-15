"use strict";

( () => {
	const pawsElement = document.querySelector( 'section.schedule .paws' );
	const outerElement = document.querySelector( 'section.schedule .outer' );

	const PAWS_HEIGHT = 26;

	window.addEventListener( 'load', resizePaws );
	window.addEventListener( 'resize', resizePaws );

	function resizePaws() {
		const newPawsHeight = outerElement.offsetHeight - outerElement.offsetHeight % PAWS_HEIGHT - 2 * PAWS_HEIGHT;
		pawsElement.style.bottom = 'auto';
		pawsElement.style.height = newPawsHeight + 'px';
	}
} )();
