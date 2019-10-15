"use strict";

( () => {
	const nav = document.querySelector( 'nav' );
	const hamburger = document.querySelector( 'nav a.hamburger' );
	const navLogo = document.querySelector( 'nav .logo' );
	const navItems = Array.from( document.querySelectorAll( 'nav li a' ) );

	const navBarHeight = nav.clientHeight;

	const sectionToHash = new Map();
	const hashToSection = new Map();

	const sectionToNav = new Map();
	const navToSection = new Map();

	window.addEventListener( 'load', () => {
		for ( let item of navItems ) {
			for ( let cls of Array.from( item.classList ) ) {
				const section = document.querySelector( `section.${ cls }` );

				if ( section ) {
					sectionToHash.set( section, `#${ section.id }` );
					hashToSection.set( `#${ section.id }`, section );

					sectionToNav.set( section, item );
					navToSection.set( item, section );

					// Prevent native scroll on hash change
					section.removeAttribute( 'id' );
				}
			}
		};

		for ( let item of navToSection.keys() ) {
			item.addEventListener( 'click', evt => {
				scrollToSection( navToSection.get( item ) );
				evt.preventDefault();
			} );
		}

		hamburger.addEventListener( 'click', evt => {
			nav.classList.toggle( 'open' );
			evt.preventDefault();
		} );

		document.addEventListener( 'mousedown', outsideClick );
		document.addEventListener( 'touchstart', outsideClick, true );

		window.addEventListener( 'scroll', ( evt ) => {
			showHideLogo();
			refreshNavigation();
		} );

		refreshNavigation();

		scrollToInitSection();
	} );

	function scrollToInitSection() {
		const initSection = hashToSection.get( location.hash );

		// Do only small adjustment, do not scroll if it is totally different scroll position.
		if( initSection && window.scrollY - initSection.offsetTop - getErrata( initSection ) < 100 ) {
			scrollToSection( initSection )
		}
	}

	function scrollToSection( section ) {
		window.scrollTo( {
			top: section.offsetTop + getErrata( section ) - navBarHeight,
			left: 0,
			behavior: 'smooth' 
		} );

		nav.classList.remove( 'open' );
	}

	function showHideLogo() {
		window.requestAnimationFrame( () => {
			if( window.scrollY > 400 ) {
				navLogo.classList.add( 'show' );
			} else {
				navLogo.classList.remove( 'show' );
			}
		} );
	}

	function refreshNavigation() {
		for( let navItem of navItems ) {
			navItem.parentNode.classList.remove( 'active' );
		}

		const farthestSection = findFarthestSection();

		if( farthestSection ) {
			history.replaceState( null, null, sectionToHash.get( farthestSection ) );
			sectionToNav.get( farthestSection ).parentNode.classList.add( 'active' );
		} else {
			history.replaceState( null, null, '/' );
		}
	}

	function findFarthestSection() {
		let offset = 0;
		let foundSection = null;

		for( let section of sectionToNav.keys() ) {
			if( section.offsetTop - navBarHeight - 10 < window.scrollY && section.offsetTop > offset ) {
				foundSection = section;
			}
		}

		return foundSection;
	}

	function getErrata( section ) {
		switch ( sectionToHash.get( section ) ) {
			case '#o-nas':
				return 50;
			case '#cennik':
				return 30;
		}

		return 0;
	}

	function outsideClick( evt ) {
		if( !nav.contains( evt.target ) ) {
			nav.classList.remove( 'open' );
		}
	}
} )();
